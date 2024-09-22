import fs from 'fs-extra'

fs.mkdirSync('./packages/el-bot/dist/cli', { recursive: true })
fs.writeFileSync('./packages/el-bot/dist/cli/index.js', '#! /usr/bin/env node')
