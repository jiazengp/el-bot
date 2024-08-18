import type { Bot } from 'el-bot'
import consola from 'consola'

export default function (ctx: Bot) {
  ctx.webhook?.on('ok', (data: any) => {
    consola.info('Get type OK!')
    consola.info(data)
  })
}
