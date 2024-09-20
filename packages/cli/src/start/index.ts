import type commander from 'commander'
import { spawn } from 'node:child_process'
import fs from 'node:fs'
import { resolve } from 'node:path'
import process from 'node:process'
import { Logger } from '@yunyoujun/logger'
import { utils } from 'el-bot'
import shell from 'shelljs'

// 实例目录下的 package.json
// eslint-disable-next-line ts/no-require-imports
const pkg = require(getAbsolutePath('./package.json'))

const logger = new Logger({ prefix: '[cli(start)]' })

/**
 * 获取当前目录下的绝对路径
 * @param file 文件名
 */
function getAbsolutePath(file: string) {
  return resolve(process.cwd(), file)
}

export default async function (cli: commander.Command) {
  /**
   * 启动机器人
   */
  function startBot() {
    const execFile = pkg.main || 'index.js' || 'index.ts' || 'index.mjs'
    const file = getAbsolutePath(execFile)

    if (fs.existsSync(file)) {
      if (file.includes('.ts'))
        spawn('ts-node', [file], { stdio: 'inherit' })
      else
        spawn('node', [file], { stdio: 'inherit' })

      return true
    }
    else {
      logger.error(
        '不存在可执行文件，请检查 package.json 中 main 入口文件是否存在，或参考文档新建 bot/index.js 机器人实例。',
      )
      return false
    }
  }

  /**
   * 启动 MCL
   */
  function startMcl(folder?: string) {
    // 先进入目录
    try {
      shell.cd(folder || (pkg.mcl ? pkg.mcl.folder : 'mcl'))
    }
    catch (err) {
      utils.handleError(err, logger)
      logger.error('mcl 目录不存在')
    }

    // remove mcl
    // glob('./mcl', {})
  }

  // 启动
  cli
    .command('start [project]')
    .description('启动 el-bot')
    .option('-f --folder', 'mirai/mcl 所在目录')
    .action((project, options) => {
      if (!project || project === 'bot')
        startBot()
      else if (project === 'mcl')
        startMcl(options.folder)
      else
        logger.error('不存在该指令')
    })
}
