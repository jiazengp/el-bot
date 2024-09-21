import { exec } from 'node:child_process'
import path from 'node:path'
import consola from 'consola'
import { Argv } from 'yargs'
import { Bot, createBot, ElUserConfig } from '../../../core'
import { commonOptions } from '../options'
import { bindShortcut } from '../utils'

let bot: Bot

/**
 * el-bot dev .
 * @param cli
 */
export function registerDevCommand(cli: Argv) {
  cli.command(
    '* [root]',
    '启动开发模式',
    args =>
      commonOptions(args)
        .option('port', {
          alias: 'p',
          type: 'number',
          describe: 'port',
        })
        .strict()
        .help(),
    async ({ root }) => {
      consola.start('Link Start ...')
      consola.log('')

      // resolve el-bot.config.ts
      const elConfigFile = path.resolve(root, 'el-bot.config.ts')
      const config = (await import(elConfigFile)).default as ElUserConfig

      bot = createBot(config)
      await bot.start()

      const SHORTCUTS = [
        {
          name: 'r',
          fullName: 'restart',
          async action() {
            await bot.stop()
            await bot.start()
          },
        },
        {
          name: 'e',
          fullName: 'edit',
          action() {
            exec(`code "${root}"`)
          },
        },
      ]
      bindShortcut(SHORTCUTS)
    },
  )
}

// for vite hmr
if (import.meta.hot) {
  consola.success('[el-bot] HMR')
  const close = async () => {
    await bot?.stop()

    // hmr
    consola.success('[el-bot] HMR')
  }
  import.meta.hot.on('vite:beforeFullReload', close)
  import.meta.hot.dispose(close)
}
