import { logger, pluginLogger } from '../bot'
import { isDev } from './misc'

/**
 * 通用的异常处理
 */
export function handleError(
  e: any | Error,
  type: '' | 'plugin' = '',
) {
  if (!e)
    return

  if (isDev)
    console.error(e)

  if (e.message) {
    if (type)
      pluginLogger.error(e.message)
    else
      logger.error(e.message)
  }
}
