import type Bot from 'el-bot'
import consola from 'consola'

export default function (ctx: Bot) {
  ctx
    .command('命令')
    .description('一个测试用的命令')
    .action((options) => {
      consola.info(options)
    })
}
