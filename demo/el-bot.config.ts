import { answerPlugin, defineConfig } from 'el-bot'

const answer = answerPlugin({
  list: [
    {
      listen: 'master',
      receivedText: ['在吗'],
      reply: 'Hello, master!',
      else: '爪巴',
    },
  ],
})

export default defineConfig({
  bot: {
    plugins: [
      answer,
    ],
  },

  napcat: {
    debug: false,

    protocol: 'ws',
    host: '127.0.0.1',
    port: 3001,
    accessToken: '',

    // ↓ 自动重连(可选)
    reconnection: {
      enable: true,
      attempts: 10,
      delay: 5000,
    },
  },
})
