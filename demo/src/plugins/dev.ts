import type { Bot } from 'el-bot'
import consola from 'consola'

export default async function (ctx: Bot) {
  const mirai = ctx.mirai
  consola.info(ctx.el.path)

  const friendList = await mirai.api.friendList()
  consola.info(friendList)
}
