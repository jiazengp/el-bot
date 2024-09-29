import { consola, defineBotPlugin } from 'el-bot'
import colors from 'picocolors'

export default defineBotPlugin({
  pkg: {
    name: 'qq',
  },
  setup: async (ctx) => {
    const { qq } = ctx
    if (!qq)
      return

    const { client, ws } = qq

    const { data } = await client.meApi.me()
    consola.info('QQ 频道机器人', colors.green(data.username), colors.dim(data.union_openid))

    // const channelsRes = await client.channelApi.channels(ylfTestGuildID)
    // const channels = channelsRes.data as IChannel[]

    ws.on('GUILD_MESSAGES', (data) => {
      consola.info('GUILD_MESSAGES', data)

      const channelId = data.msg.channel_id
      // 主动消息不能在00:00:00 - 05:59:59 推送
      client.messageApi
        .postMessage(channelId, {
          content: '2',
          msg_id: data.msg.id,
        })

      // 链接、文本列表模板
      // client.messageApi.postMessage(channelId, {
      //   ark: arkTemplateMessage.ark,
      // })

      // keyboard
      // 无 markdown 权限
    //   client.messageApi.postMessage(channelId, {
    //     markdown: {
    //       template_id: 1,
    //       params: [
    //         {
    //           key: 'title',
    //           value: ['标题'],
    //         },
    //       ],
    //     },
    //     msg_id: 'xxxxxx',
    //     keyboard: {
    //       content: {
    //         rows: [
    //           {
    //             buttons: [
    //               {
    //                 id: '1',
    //                 render_data: {
    //                   label: 'AtBot-按钮1',
    //                   visited_label: '点击后按钮1上文字',
    //                 },
    //                 action: {
    //                   type: 2,
    //                   permission: {
    //                     type: 2,
    //                     specify_role_ids: ['1', '2', '3'],
    //                   },
    //                   click_limit: 10,
    //                   unsupport_tips: '编辑-兼容文本',
    //                   data: '/搜索',
    //                   at_bot_show_channel_list: true,
    //                 },
    //               },
    //             ],
    //           },
    //         ],
    //         bot_appid: 123123123,
    //       },
    //     },
    //   })
    })
  },
})
