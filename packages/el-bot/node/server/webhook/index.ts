import { createNodeMiddleware } from '@octokit/webhooks'
import consola from 'consola'
import { BotServer } from '../hono'
import { createOctokitWebhooks } from './octokit'
import { WebhooksOptions } from './types'
// import * as octokit from '@octokit/webhooks'
// import { githubHandler } from './github-handler'
import colors from 'picocolors'

export * from './types'

/**
 * create webhook
 * - github
 * @param app
 */
export function createWebhooks(app: BotServer, options: WebhooksOptions) {
  const path = options.octokit.middlewareOptions?.path || '/api/github/webhooks'
  consola.success(`🪝  Webhooks enabled at ${colors.green(`http://localhost:${options.port}${path}`)}`)

  const webhooks = createOctokitWebhooks({
    secret: options.octokit.secret,
  })
  webhooks.onAny(({ id, name, payload }) => {
    consola.info(`🪝  ${colors.green(name)} event received: ${colors.green(id)}`)
    // eslint-disable-next-line no-console
    console.dir(payload)
  })

  const middleware = createNodeMiddleware(webhooks, options.octokit.middlewareOptions)
  app.use(async (ctx, next) => {
    if (await middleware(ctx.env.incoming, ctx.env.outgoing)) {
      await next()
    }
    else {
      ctx.env.outgoing.writeHead(404)
      ctx.env.outgoing.end()
    }
  })
}
