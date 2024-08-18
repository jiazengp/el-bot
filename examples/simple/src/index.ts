// import { Bot } from 'el-bot'

// const bot = new Bot({})
// bot.start()

import process from 'node:process'
import consola from 'consola'

import { AvailableIntentsEventsEnum, GetWsParam } from 'qq-guild-bot'
import 'dotenv/config'

import { DOMAINS } from 'qq-sdk'
import axios from 'axios'

export const testConfig: GetWsParam = {
  appID: process.env.QQ_BOT_APP_ID || '', // 申请机器人时获取到的机器人 BotAppID
  token: process.env.QQ_BOT_APP_TOKEN || '', // 申请机器人时获取到的机器人 BotToken
  intents: [
    AvailableIntentsEventsEnum.PUBLIC_GUILD_MESSAGES,
  ], // 事件订阅,用于开启可接收的消息类型
  sandbox: true, // 沙箱支持，可选，默认false. v2.7.0+
}

export async function main() {
// 创建 client
  // const client = createOpenAPI(testConfig)
  // client.messageApi
  //   .postMessage('120117362', {
  //     content: 'Hello, World!',
  //   })
  //   .catch((err) => {
  //     // err信息错误码请参考API文档错误码描述
  //     console.log(err)
  //   })

  // // 创建 websocket 连接
  // const ws = createWebsocket(testConfig)
  // ws.connect(testConfig)
  // // ws.on('PUBLIC_GUILD_MESSAGES', (data) => {
  // //   console.log('[PUBLIC_GUILD_MESSAGES] 事件接收 :', data)
  // // })

  // return {
  //   client,
  //   ws,
  // }

  consola.info(
    process.env.QQ_BOT_APP_ID,
    process.env.QQ_BOT_APP_TOKEN,
  )
  // const data = await getAppAccessToken({
  //   appId: process.env.QQ_BOT_APP_ID || '',
  //   clientSecret: process.env.QQ_BOT_APP_TOKEN || '',
  // })

  // 测试群
  const groupId = 120117362
  const { data } = await axios.post(`${DOMAINS.SANDBOX}/v2/groups/${groupId}/messages`, {
    content: 'Hello, World!',
    msg_type: 0,
  }, {
    headers: {
      Authorization: `QQBot ${process.env.QQ_BOT_APP_TOKEN}`,
    },
  })
  consola.info(data)
}

main()
