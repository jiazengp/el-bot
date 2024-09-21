import { resolve } from 'node:path'
import process from 'node:process'
import { createLogger, utils } from 'el-bot'
import shell from 'shelljs'

// 实例目录下的 package.json
// eslint-disable-next-line ts/no-require-imports
const pkg = require(getAbsolutePath('./package.json'))

const logger = createLogger().child({ label: '🚀' })

/**
 * 获取当前目录下的绝对路径
 * @param file 文件名
 */
function getAbsolutePath(file: string) {
  return resolve(process.cwd(), file)
}

/**
 * @deprecated
 * TODO: refactor for napcat
 */
export default async function (cli: any) {
  /**
   * 启动机器人
   */
  function startBot() {
    // el-bot
  }

  /**
   * 启动 MCL
   * @deprecated mirai
   */
  function startMcl(folder?: string) {
    // 先进入目录
    try {
      shell.cd(folder || (pkg.mcl ? pkg.mcl.folder : 'mcl'))
    }
    catch (err) {
      utils.handleError(err)
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
    .action((project: string, options: { folder: string | undefined }) => {
      if (!project || project === 'bot')
        startBot()
      else if (project === 'mcl')
        startMcl(options.folder)
      else
        logger.error('不存在该指令')
    })
}
