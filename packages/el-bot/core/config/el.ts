import type { WebhookConfig } from '../bot/webhook'
import type { BotConfig, BotUserConfig } from './bot'
import { resolve } from 'node:path'
import process from 'node:process'
import fs from 'fs-extra'
// import type { MiraiApiHttpSetting } from 'mirai-ts'
import { NCWebsocketOptions } from 'node-napcat-ts'
import { Target } from '../../types'

import { mergeConfig } from '../utils/config'

export interface dbConfig {
  /**
   * 是否启用
   */
  enable: boolean
  /**
   * 数据库连接 uri
   */
  uri?: string
  /**
   * 是否进行统计分析
   */
  analytics?: boolean
}

/**
 * 上报配置
 */
export interface reportConfig {
  /**
   * 是否启用
   */
  enable: boolean
  /**
   * 上报对象
   */
  target?: Target
}

const pkg = JSON.parse(fs.readFileSync(resolve(process.cwd(), 'package.json'), 'utf-8'))

export interface ElConfig<T = BotConfig> {
  /**
   * 开启调试模式
   */
  debug?: boolean
  /**
   * mongodb 数据库默认配置
   */
  db: dbConfig
  /**
   * 机器人及相关插件配置
   */
  bot: T
  /**
   * node-napcat-ts 配置
   * @see https://github.com/huankong233/node-napcat-ts
   * @see https://blog.huankong.top/docs/node-napcat-ts/
   */
  napcat: NCWebsocketOptions & {
    debug?: boolean
  }
  /**
   * webhook 配置
   */
  webhook: WebhookConfig
  /**
   * 上报错误信息配置
   */
  report: reportConfig
  /**
   * 用户的 package.json
   */
  pkg?: any
  /**
   * 根目录
   */
  base: string
}

export type ElUserConfig = Partial<ElConfig<BotUserConfig>>

/**
 * 解析 El Config
 */
export function resolveElConfig(userConfig: ElUserConfig) {
  const defaultElConfig: ElConfig = {
    db: {
      enable: false,
    },
    napcat: {
      protocol: 'ws',
      host: '127.0.0.1',
      port: 3001,
      accessToken: '',
    },
    bot: {
      name: 'el-bot',
      plugins: [],
      // default: [
      //   'admin',
      //   'answer',
      //   'forward',
      //   'limit',
      //   'memo',
      //   'rss',
      //   'search',
      //   'qrcode',
      // ],
      autoloadPlugins: true,
      pluginDir: 'bot/plugins',
      master: [910426929],
      admin: [910426929],
      devGroup: 120117362,
    },
    webhook: {
      enable: true,
      port: 7777,
      path: '/webhook',
      secret: 'el-psy-congroo',
    },
    report: {
      enable: false,
    },
    base: process.cwd(),
  }

  // 合并
  const config = mergeConfig(defaultElConfig, userConfig) as ElConfig
  config.pkg = pkg

  return config
}
