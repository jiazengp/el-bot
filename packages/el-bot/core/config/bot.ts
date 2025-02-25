// import type { AnswerOptions } from '../plugins/answer'
// import type { ForwardOptions } from '../plugins/forward'

import { BotPlugin } from '../bot'

export interface BotConfig {
  /**
   * 机器人名
   */
  name: string

  /**
   * 是否自动加载 plugins 文件夹下的自定义插件，默认目录为 ['plugins']
   */
  autoloadPlugins: boolean
  /**
   * 默认自动加载插件的目录
   * @default 'bot/plugins'
   */
  pluginDir: string

  /**
   * 插件配置
   */
  plugins: BotPlugin[]

  /**
   * 主人（超级管理员）
   */
  master: number[]
  /**
   * 管理员
   */
  admin: number[]

  /**
   * 开发测试群
   */
  devGroup: number

  /**
   * 其他插件配置
   */
  [propName: string]: any
}

export type BotUserConfig = Partial<BotConfig>
