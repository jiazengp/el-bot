import { defineBotPlugin, pluginLogger } from 'el-bot'
import { Structs } from 'node-napcat-ts'

export default defineBotPlugin({
  pkg: {
    name: 'ping',
  },
  setup: (ctx) => {
    pluginLogger.info('ping 自己的插件日志')

    const { napcat } = ctx
    napcat.on('message', (msg) => {
      if (msg.raw_message === '捅死你') {
        ctx.reply(msg, [
          Structs.text('我爱你'),
        ])
      }
    })
  },
})
