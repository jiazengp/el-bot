import { defineBotConfig } from 'el-bot'

export const config = {
  rules: [
    {
      match: '在吗',
      reply: '爪巴',
    },
    {
      match: /^(.+)一时爽$/,
      reply: (_: any, str: string) => `一直${str}一直爽`,
    },
  ],
}

export default defineBotConfig({
  'name': '嘿',
  'autoloadPlugins': true,

  // plugins
  // default: [
  //   // # - dev
  //   'admin',
  //   'answer',
  //   // "blacklist",
  //   // "counter",
  //   // "feeder",
  //   // "forward",
  //   // "limit",
  //   // "memo",
  //   'nbnhhsh',
  //   'qrcode',
  //   // "rss",
  //   // "report",
  //   // "search",
  //   // "search-image",
  //   'teach',
  //   // "workflow",
  // ],
  // custom: ['./plugins/webhook', './plugins/command'],

  'master': [910426929],

  'answer': [
    {
      is: '在吗',
      reply: 'Yes, Master!',
      help: '在不在测试',
    },
  ],

  'search-image': {
    token: '0306dd15aa139efd8c0e2820e07249aef0c9361b',
    options: {
      results: 3,
    },
  },

  'report': [
    {
      type: 'jdy-report',
      // eslint-disable-next-line no-template-curly-in-string
      content: '简道云每日填报情况：${data.msg}',
      target: {
        group: [120117362],
      },
    },
  ],
})
