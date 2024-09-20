import consola from 'consola'
import { Argv } from 'yargs'
import { createBot } from '../../../src'
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
      // start
      consola.info('start dev')

      const bot = createBot({
        napcat: {
          protocol: 'ws',
          host: '127.0.0.1',
          port: 3001,
          accessToken: 'yunyoujun',
        },
      })
      bot.start()
    },
  )
}
