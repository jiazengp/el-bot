import fs from 'fs-extra'
import { BotPlugin } from './types'

/**
 * 获取目录下的所有插件
 * @param dir
 */
export async function getAllPlugins(dir: string): Promise<string[]> {
  const plugins = await fs.readdir(dir)

  return plugins.map((plugin) => {
    // remove suffix
    const pluginName = plugin.replace(/\.ts$/, '')
    return pluginName
  })
}

export interface PluginOptions {}

/**
 * @example
 * 定义机器人插件
 * ```ts
 * import { defineBotPlugin } from 'el-bot'
 *
 * export default defineBotPlugin({
 *   pkg: {
 *     name: 'ping',
 *   },
 *   setup: (ctx) => {},
 * })
 * ```
 *
 * @example
 * 定义带配置的插件
 * ```ts
 * import { defineBotPlugin } from 'el-bot'
 *
 * export default defineBotPlugin<CustomPluginOptions>((options) => ({
 *   pkg: {
 *     name: 'ping',
 *   },
 *   setup: (ctx) => {
 *     console.log(options)
 *   }
 * })
 * ```
 */
export function defineBotPlugin<T = PluginOptions>(botPlugin: BotPlugin | ((options: T) => BotPlugin)) {
  return botPlugin as T extends PluginOptions ? (options: T) => BotPlugin : BotPlugin
}
