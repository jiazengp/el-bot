import { defineConfig } from 'el-bot'

export default defineConfig({
  bot: {

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
