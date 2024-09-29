import path from 'node:path'
import process from 'node:process'
import consola from 'consola'
import colors from 'picocolors'
import { type Bot, BotPlugin, logger } from '..'

import { isFunction } from '../../shared'
import { merge } from '../../utils/config'
import { handleError } from '../../utils/error'
import { pluginLogger } from '../logger'
import { getAllPlugins } from './utils'

export type PluginInstallFunction = (ctx: Bot, ...options: any[]) => any

export interface PluginInfo {
  name?: string
  version?: string
  description?: string
  pkg?: object
}

export type Plugin = ({
  install: PluginInstallFunction
} & PluginInfo)

export type PluginType = 'default' | 'official' | 'community' | 'custom'

export const PluginTypeMap: Record<PluginType, string> = {
  default: '默认插件',
  official: '官方插件',
  community: '社区插件',
  custom: '自定义插件',
}

export class Plugins {
  default = new Set<PluginInfo>()
  official = new Set<PluginInfo>()
  community = new Set<PluginInfo>()
  custom = new Set<PluginInfo>()
  constructor(public ctx: Bot) {}

  /**
   * 根据名称判断是否为官方插件
   * @param name
   */
  isOfficial(name: string) {
    return name.startsWith('@el-bot/plugin-')
  }

  /**
   * 根据名称判断是否为社区插件
   * @param name
   */
  isCommunity(name: string) {
    return name.startsWith('el-bot-plugin-')
  }

  /**
   * 根据插件类型，获得插件标准全名或路径
   * @param name
   */
  getPluginFullName(name: string, type: PluginType) {
    let pkgName = name
    switch (type) {
      case 'default':
        pkgName = `${name}`
        break
      case 'official':
        pkgName = `@el-bot/plugin-${name}`
        break
      case 'community':
        pkgName = `el-bot-plugin-${name}`
        break
      case 'custom':
        pkgName = path.resolve(process.cwd(), name)
        break
      default:
        break
    }
    return pkgName
  }

  /**
   * 加载配置中的插件
   * plugins: []
   */
  async loadConfig() {
    const botConfig = this.ctx.el.bot!
    if (botConfig.plugins) {
      consola.start(`加载配置插件 - 共 ${colors.green(botConfig.plugins.length)} 个...`)
      consola.log('')

      for (const plugin of botConfig.plugins) {
        const pkgName = plugin.pkg?.name || '未知'
        try {
          if (plugin) {
            await plugin.setup(this.ctx)
            pluginLogger
              .child({ plugin: pkgName })
              .success(`加载成功`)
          }
        }
        catch (err: any) {
          handleError(err as Error)
          pluginLogger
            .child({ plugin: pkgName })
            .error(`加载失败`)
        }
      }
    }
    consola.log('')
  }

  /**
   * 加载自定义插件
   */
  async loadCustom(pluginDir: string) {
    if (!pluginDir) {
      pluginLogger.warning('未配置自定义插件目录')
    }
    else {
      const absolutePluginDir = path.resolve(process.cwd(), pluginDir)
      consola.info(`自定义插件目录: ${colors.cyan(absolutePluginDir)}`)
      const customPlugins = await getAllPlugins(absolutePluginDir)
      consola.start(`加载自定义插件 - 共 ${colors.green(customPlugins.length)} 个...`)
      consola.log('')

      for (const pluginItem of customPlugins) {
        const pluginPath = path.resolve(absolutePluginDir, pluginItem.path)
        const importedCustomPlugin = (await import(pluginPath)).default
        let customPlugin: BotPlugin
        if (typeof importedCustomPlugin === 'function') {
          // TODO: 传入配置 options
          customPlugin = importedCustomPlugin({})
        }
        else {
          customPlugin = importedCustomPlugin
        }
        await customPlugin.setup(this.ctx)
        pluginLogger.child({ plugin: pluginItem.name }).success(`加载成功`)
      }
    }
  }

  /**
   * 是否依赖于数据库
   * @param pkg
   */
  isBasedOnDb(pkg: any): boolean {
    return pkg['el-bot'] && pkg['el-bot'].db && !this.ctx.db
  }

  /**
   * 添加插件
   * @param name 插件名
   * @param plugin 插件函数
   * @param options 默认配置
   */
  add(name: string, plugin: Plugin, options?: any) {
    const ctx = this.ctx

    // 插件基于数据库，但是未启用数据库时
    if (plugin.pkg && this.isBasedOnDb(plugin.pkg)) {
      logger.warning(
        `[${name}] 如想要使用该插件，您须先启用数据库。`,
      )
      return
    }

    // 加载配置项
    let pluginOptions = options

    if (this.ctx.el.bot![name]) {
      if (pluginOptions)
        pluginOptions = merge(pluginOptions, this.ctx.el.bot![name])
      else
        pluginOptions = this.ctx.el.bot![name]
    }

    if (plugin && isFunction(plugin.install))
      plugin.install(ctx, pluginOptions)
  }

  /**
   * 插件列表
   * @param type 插件类型
   */
  list(type: PluginType) {
    const pluginTypeName = PluginTypeMap[type]
    let content = `无${pluginTypeName}\n`
    if (this[type].size > 0) {
      content = `${pluginTypeName}:\n`
      this[type].forEach((plugin: PluginInfo) => {
        content += `- ${plugin.name}@${plugin.version}: ${plugin.description}\n`
      })
    }
    return content
  }
}
