import { MessageToCreate } from 'qq-guild-bot'

/**
 * @see https://bot.q.qq.com/wiki/develop/nodesdk/message/message_template.html#list-%E7%BB%93%E6%9E%84
 */
export const arkTemplateMessage: MessageToCreate = {
  ark: {
    template_id: 23,
    kv: [
      {
        key: '#DESC#',
        value: 'descaaaaaa',
      },
      {
        key: '#PROMPT#',
        value: 'promptaaaa',
      },
      {
        key: '#LIST#',
        obj: [
          {
            obj_kv: [
              {
                key: 'desc',
                value: '需求标题：UI问题解决',
              },
            ],
          },
          {
            obj_kv: [
              {
                key: 'desc',
                value: '当前状态"体验中"点击下列动作直接扭转状态到：',
              },
            ],
          },
          {
            obj_kv: [
              {
                key: 'desc',
                value: '已评审',
              },
              {
                key: 'link',
                // value: 'https://yunyoujun.cn/about',
              },
            ],
          },
          {
            obj_kv: [
              {
                key: 'desc',
                value: '已排期',
              },
              {
                key: 'link',
                // value: 'https://yunyoujun.cn/about',
              },
            ],
          },
          {
            obj_kv: [
              {
                key: 'desc',
                value: '开发中',
              },
              {
                key: 'link',
                // value: 'https://yunyoujun.cn/about',
              },
            ],
          },
          {
            obj_kv: [
              {
                key: 'desc',
                value: '增量测试中',
              },
              {
                key: 'link',
                // value: 'https://yunyoujun.cn/about',
              },
            ],
          },
          {
            obj_kv: [
              {
                key: 'desc',
                value: '请关注',
              },
            ],
          },
        ],
      },
    ],
  } as any,
}
