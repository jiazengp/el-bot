import type { EventEmitter } from 'node:events'
import type { IncomingMessage, ServerResponse } from 'node:http'
import * as shell from 'shelljs'

import * as octokit from '@octokit/webhooks'
import type { Bot } from 'el-bot'

// github handler
export interface handler extends EventEmitter {
  (
    req: IncomingMessage,
    res: ServerResponse,
    callback: (err: Error) => void
  ): void
}

/**
 * Setup github webhook handler
 * @see https://github.com/octokit/webhooks
 */
export function githubHandler(ctx: Bot) {
  const config = {
    secret: ctx.el.webhook?.secret || 'el-psy-congroo',
  }

  const handler = new octokit.Webhooks(config)
  const middleware = octokit.createNodeMiddleware(handler, {
    path: ctx.el.webhook?.path || '/webhook',
  })

  handler.onError((err) => {
    ctx.logger.error(`Error: ${err}`)
  })

  // 处理
  handler.on('push', (event) => {
    ctx.logger.info(
      `Received a push event for ${event.payload.repository.name} to ${event.payload.ref}`,
    )

    // git pull repo
    if (shell.exec('git pull').code !== 0) {
      ctx.logger.error('Git 拉取失败，请检查默认分支。')
    }
    else {
      ctx.logger.info('安装依赖...')
      shell.exec('yarn')
    }
  })

  return {
    handler,
    middleware,
  }
}
