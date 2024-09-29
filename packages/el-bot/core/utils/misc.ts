import process from 'node:process'
import consola from 'consola'

import gradient from 'gradient-string'
import nodeNapcatTsPkg from 'node-napcat-ts/package.json'
import colors from 'picocolors'

import pkg from '../../package.json'

/**
 * 是否为开发模式
 */
export const isDev = process.env.NODE_ENV !== 'production'

/**
 * 休眠
 * @param ms
 */
export async function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

const cyanBlue = gradient('cyan', 'blue')

/**
 * 声明
 */
export function statement() {
  const asciis = [
    ' _____ _   ____        _',
    '| ____| | | __ )  ___ | |_',
    '|  _| | | |  _ \\ / _ \\| __|',
    '| |___| | | |_) | (_) | |_',
    '|_____|_| |____/ \\___/ \\__|',
  ]
  // eslint-disable-next-line no-console
  console.log(cyanBlue(asciis.join('\n')))
  // console gradient
  consola.log('')
  consola.debug(`${cyanBlue('Docs: ')} ${colors.dim(pkg.homepage)}`)
  consola.debug(`GitHub: ${colors.dim(pkg.repository.url)}`)
  consola.info(`el-bot: ${colors.cyan(`v${pkg.version}`)}`)
  consola.info(`napcat-node-ts: ${colors.cyan(`v${nodeNapcatTsPkg.version}`)}`)
  // eslint-disable-next-line no-console
  console.log('')
}
