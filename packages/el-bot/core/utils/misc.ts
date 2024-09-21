import process from 'node:process'
import consola from 'consola'

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

/**
 * 声明
 */
export async function statement() {
  consola.debug(`Docs: ${colors.dim(pkg.homepage)}`)
  consola.debug(`GitHub: ${colors.dim(pkg.repository.url)}`)
  consola.info(`El Bot: ${colors.cyan(`v${pkg.version}`)}`)
  const napcatTSVersion = (pkg.dependencies || {})['node-napcat-ts']
  if (napcatTSVersion) {
    const { version } = (await import('node-napcat-ts/package.json'))
    consola.info(`napcat-node-ts: ${colors.cyan(`v${version}`)}`)
  }
  // eslint-disable-next-line no-console
  console.log('')
}
