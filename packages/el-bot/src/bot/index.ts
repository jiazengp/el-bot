import type commander from 'commander'
import type mongoose from 'mongoose'
import type { Server } from 'node:net'
import type { ElConfig, ElUserConfig } from '../config/el'
import fs from 'node:fs'
import { resolve } from 'node:path'
import process from 'node:process'
import chalk from 'chalk'
import consola from 'consola'
import { NCWebsocket } from 'node-napcat-ts'
import { resolveElConfig } from '../config/el'

import { connectDb } from '../db'
import { isFunction } from '../shared'
import { handleError } from '../utils/error'
import { statement } from '../utils/misc'
import { initCli } from './cli'
import { Command } from './command'
import { createLogger } from './logger'
import { Plugins } from './plugins'
import { Sender } from './sender'
import { Status } from './status'
import { User } from './user'
import Webhook from './webhook'

// shared

// node

// type
import type { Plugin, PluginInstallFunction } from './plugins'

// export
export * from './logger'

/**
 * 创建机器人
 * @param el
 */
export function createBot(el: ElUserConfig) {
  return new Bot(el)
}

export const logger = createLogger('🤖')

export class Bot {
  /**
   * 全局配置
   */
  el: ElConfig
  // mirai: MiraiInstance
  // 激活
  active = true
  /**
   * 数据库，默认使用 MongoDB
   */
  db?: mongoose.Connection

  /**
   * node-napcat-ts
   */
  napcat: NCWebsocket

  /**
   * 状态
   */
  status: Status
  /**
   * 用户系统
   */
  user: User
  /**
   * 发送器
   */
  sender: Sender
  /**
   * 插件系统
   */
  plugins: Plugins
  /**
   * 已安装的插件
   */
  installedPlugins = new Set()
  /**
   * 面向开发者的指令系统
   */
  cli: commander.Command
  /**
   * 面向用户的指令系统
   */
  _command: Command
  /**
   * 日志系统
   */
  logger = logger
  webhook?: Webhook
  /**
   * 是否开发模式下
   */
  isDev = process.env.NODE_ENV !== 'production'
  rootDir = process.cwd()
  tmpDir = 'tmp/'
  isTS = fs.existsSync(resolve(this.rootDir, 'tsconfig.json'))
  constructor(el: ElUserConfig) {
    this.el = resolveElConfig(el)
    // const setting = this.el.setting as MiraiApiHttpSetting
    // this.mirai = new Mirai(setting)
    this.status = new Status(this)
    this.user = new User(this)
    this.sender = new Sender(this)
    this.plugins = new Plugins(this)
    this._command = new Command(this)
    if (this.el.webhook && this.el.webhook.enable)
      this.webhook = new Webhook(this)

    this.cli = initCli(this, 'el')

    // report error to qq
    if (this.el.report?.enable) {
      const logError = this.logger.error
      this.logger.error = (...args: any) => {
        const target = this.el.report?.target || {}
        if (this.el.bot.devGroup) {
          if (target?.group)
            target.group.push(this.el.bot.devGroup)
          else target.group = [this.el.bot.devGroup]
        }
        // this.sender.sendMessageByConfig(args.join(' '), target)
        return logError(args[0], ...args.slice(1))
      }
    }

    // napcat
    this.napcat = new NCWebsocket(this.el.napcat)
  }

  /**
   * 机器人当前消息 快捷回复
   */
  // eslint-disable-next-line unused-imports/no-unused-vars
  reply(msgChain: string, quote = false) {
    // if (this.mirai.curMsg && this.mirai.curMsg.reply) {
    //   return this.mirai.curMsg.reply(msgChain, quote)
    // }
    // else {
    //   this.logger.error('当前消息不存在')
    //   return false
    // }
  }

  /**
   * 自动重连
   */
  // async link(): Promise<Api.Response.BaseResponse | undefined> {
  //   try {
  //     const data = await this.mirai.link(this.el.qq)
  //     return data
  //   }
  //   catch (err: any) {
  //     this.logger.error(err.message)
  //     await sleep(3000)
  //     this.logger.warning('尝试重新连接...')
  //     await this.link()
  //   }
  // }

  /**
   * 启动机器人
   */
  async start() {
    if (!this.isDev)
      statement(this)

    // 连接数据库
    if (this.el.db?.enable)
      await connectDb(this, this.el.db)

    // 链接 QQ
    if (!this.el.qq) {
      this.logger.warn('未传入机器人 QQ')
    }
    else {
      this.logger.info(`Bot QQ: ${chalk.green(this.el.qq)}`)
    }

    this.napcat.connect()
    this.logger.success('NapcatQQ connected!')

    this.logger.info('Link Start!')

    // link
    // const data = await this.link()
    // if (data?.code !== 0) {
    //   this.logger.error('无法正确链接您的 QQ，请检查 QQ 是否正确！')
    //   return
    // }

    // // mah about
    // try {
    //   const { data } = await this.mirai.api.about()
    //   this.logger.info(`[mah] version: ${data.version}`)
    // }
    // catch (e) {
    //   console.error(e)
    //   this.logger.error(
    //     '未检测到 mirai-api-http 版本，请检查是否已与 mah 建立链接！',
    //   )
    //   return
    // }

    // 加载插件
    // this.logger.info('开始加载插件')
    // this.plugins.load('default')
    // this.plugins.load('official')
    // this.plugins.load('community')

    // if (this.el.bot.autoloadPlugins) {
    //   try {
    //     const allCustomPlugins = getAllPlugins(
    //       resolve(
    //         this.rootDir,
    //         (this.isTS ? 'src/' : '') + this.el.bot.pluginDir,
    //       ),
    //     )
    //     this.el.bot.plugins!.custom = allCustomPlugins.map(path =>
    //       resolve((this.isTS ? 'dist/' : '') + this.el.bot.pluginDir, path),
    //     )
    //   }
    //   catch (e: any) {
    //     this.logger.error(
    //       `无法加载 plugins ${this.el.bot.pluginDir} 目录，请检查 'bot.pluginDir' 配置`,
    //     )
    //     consola.error(e)
    //   }
    // }

    // this.plugins.load('custom')

    // this.mirai.listen()

    // 监听并解析用户指令
    this._command.listen()

    // 启动 webhook
    let server: Server | undefined
    if (this.el.webhook && this.el.webhook.enable) {
      try {
        server = this.webhook?.start()
      }
      catch (err: any) {
        handleError(err, this.logger)
      }
    }

    // 退出信息
    process.on('exit', () => {
      // 关闭数据库连接
      if (this.db) {
        this.db.close()
        this.logger.info('[db] 关闭数据库连接')
      }

      // close koa server
      if (this.el.webhook && this.el.webhook.enable) {
        if (server) {
          server.close()
          this.logger.info('[webhook] 关闭 Server')
        }
      }

      this.logger.warning('Bye, Master!')
      // this.mirai.release()
    })
  }

  /**
   * 加载自定义函数插件（但不注册）
   * 注册请使用 .plugin
   * 与 this.plugin.use() 的区别是此部分的插件将不会显示在插件列表中
   */
  use(plugin: Plugin | PluginInstallFunction, ...options: any[]) {
    const installedPlugins = this.installedPlugins
    if (installedPlugins.has(plugin)) {
      if (this.isDev) {
        this.logger.warn('插件已经被安装')
      }
    }
    else if (plugin && isFunction(plugin)) {
      installedPlugins.add(plugin)
      plugin(this, ...options)
    }
    else if (isFunction(plugin.install)) {
      installedPlugins.add(plugin)
      plugin.install(this, ...options)
    }
    else if (this.isDev) {
      consola.info(plugin)
      this.logger.warn('插件必须是一个函数，或是带有 "install" 属性的对象。')
    }
    return this
  }

  /**
   * 注册插件
   * @param name 插件名称
   * @param plugin 插件函数
   * @param options 插件选项
   */
  plugin(name: string, plugin: Plugin | PluginInstallFunction, ...options: any[]) {
    const addedPlugin = isFunction(plugin)
      ? {
          install: plugin,
        }
      : plugin

    this.plugins.add(name, addedPlugin, ...options)
    this.plugins.custom.add({
      name,
    })
  }

  /**
   * 注册指令（面向用户）
   */
  command(name: string) {
    return this._command.command(name)
  }
}
