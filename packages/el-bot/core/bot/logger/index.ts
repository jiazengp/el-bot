// import colors from 'picocolors'
import { createLogger } from './winston'

export * from './winston'

const defaultLogger = createLogger()
/**
 * Bot 日志
 */
export const logger = defaultLogger.child({ label: '🤖' })
export const botLogger = logger
/**
 * 插件日志
 */
export const pluginLogger = logger.child({ label: '🔌' })
