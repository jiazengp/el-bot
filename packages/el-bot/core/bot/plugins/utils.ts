import fs from 'fs-extra'
import { BotPlugin } from './types'

/**
 * 获取目录下的所有插件
 * @param dir
 */
export async function getAllPlugins(dir: string) {
  const pluginFiles = await fs.readdir(dir)

  const plugins: {
    name: string
    path: string
  }[] = []
  for (const plugin of pluginFiles) {
    const name = plugin.replace(/\.ts$/, '')
    const stat = await fs.stat(`${dir}/${plugin}`)
    if (stat.isDirectory()) {
      const path = `${plugin}/index.ts`
      plugins.push({
        name,
        path,
      })
    }
    else {
      plugins.push({
        name,
        path: plugin,
      })
    }
  }
  return plugins
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
