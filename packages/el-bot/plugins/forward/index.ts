import type { EventType, Mirai } from 'mirai-ts'

import { AllMessageList } from './types'

/**
 * 撤回消息对应转发群中的消息
 * @param mirai
 * @param msg
 * @param allMessageList
 */
export function recallByList(
  mirai: Mirai,
  msg: EventType.FriendRecallEvent | EventType.GroupRecallEvent,
  allMessageList: AllMessageList,
) {
  if (allMessageList && msg.messageId in allMessageList) {
    allMessageList[msg.messageId].forEach((messageId: number) => {
      // @ts-expect-error null
      mirai.api.recall(messageId)
    })
    allMessageList[msg.messageId] = []
  }
}

// export default function (ctx: Bot, options: ForwardOptions) {
//   const mirai = ctx.mirai
//   /**
//    * 原消息和被转发的各消息 Id 关系列表
//    */
//   const allMessageList: AllMessageList = {}
//   mirai.on('message', async (msg: MessageType.ChatMessage) => {
//     if (!msg.sender || !msg.messageChain)
//       return

//     if (options) {
//       await Promise.all(
//         options.map(async (item: ForwardItem) => {
//           // const canForward = ctx.status.getListenStatusByConfig(
//           //   msg.sender,
//           //   item,
//           // )

//           // if (canForward) {
//           //   // remove source
//           //   const sourceMessageId: number = msg.messageChain[0].id
//           //   allMessageList[
//           //     sourceMessageId
//           //   ] = await ctx.sender.sendMessageByConfig(
//           //     msg.messageChain.slice(1),
//           //     item.target,
//           //   )
//           // }
//         }),
//       )
//     }
//   })

//   // 消息撤回
//   mirai.on('FriendRecallEvent', (msg: EventType.FriendRecallEvent) => {
//     recallByList(mirai, msg, allMessageList)
//   })

//   mirai.on('GroupRecallEvent', (msg: EventType.GroupRecallEvent) => {
//     recallByList(mirai, msg, allMessageList)
//   })
// }
