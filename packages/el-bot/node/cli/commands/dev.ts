import consola from 'consola'
import { Argv } from 'yargs'
import { createBot } from '../../../core'
import { commonOptions } from '../options'

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
    async (_argv) => {
      consola.start('Link Start ...')
      consola.log('')
      const bot = createBot({
        napcat: {
          protocol: 'ws',
          host: '127.0.0.1',
          port: 3001,
          accessToken: '',

          // ↓ 自动重连(可选)
          reconnection: {
            enable: true,
            attempts: 10,
            delay: 5000,
          },
        },
      })
      bot.start()
    },
  )
}
