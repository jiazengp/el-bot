/* eslint-disable no-console */
import { AllHandlers, NCWebsocket } from 'node-napcat-ts'

function handler(context: AllHandlers['message']) {
  console.log(context.message)
}

async function main() {
  const napcat = new NCWebsocket({
    // 3001
    protocol: 'ws',
    host: '127.0.0.1',
    port: 3001,
    accessToken: 'yunyoujun',
  }, true)

  console.log(napcat)
  // napcat.connect()
  napcat
    .on('message.group', handler)

  napcat.connect()
  // await napcat.send_msg({
  //   user_id: 910426929,
  //   message: [Structs.text('Hello')],
  // })
}

main()
