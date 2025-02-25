import type { Bot } from 'el-bot'
import type { MessageType } from 'mirai-ts'
import type { ICounter } from './counter.schema'
import { check } from 'mirai-ts'
import { Counter } from './counter.schema'

/**
 * 根据匹配规则统计关键字
 * @param msg
 * @param option
 */
async function countKeyword(msg: MessageType.ChatMessage, option: ICounter) {
  if (check.match(msg.plain, option.match)) {
    await Counter.findOneAndUpdate(
      {
        match: option.match,
      },
      {
        $inc: {
          total: 1,
        },
      },
      {
        upsert: true,
      },
    )
  }
}

/**
 * 计数器
 * @param ctx
 */
export default async (ctx: Bot) => {
  const { mirai } = ctx
  const options = await Counter.find()

  mirai.on('message', (msg) => {
    options.forEach((option) => {
      countKeyword(msg, option)
    })
  })
}
