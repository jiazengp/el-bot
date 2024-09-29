/**
 * @documentation
 * 为什么不使用 [Elysia](https://elysiajs.com)?
 * Elysia 是 Bun First 框架，它使用了 Bun 的 API 来创建 Server。
 * 而其 Server 类型与 @octokit/webhooks 的 Server 类型不同，所以无法直接使用现有生态的中间件。
 *
 * 由于生态问题，改为使用 Hono（同样兼容 Bun）。
 */

import { HttpBindings, serve } from '@hono/node-server'
import consola from 'consola'
import { Hono } from 'hono'

import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { poweredBy } from 'hono/powered-by'

import colors from 'picocolors'
import { BotServerOptions } from '../../core'
import { createWebhooks } from './webhook'

export type Bindings = HttpBindings
export type BotServer = Hono<{
  Bindings: Bindings
}>

/**
 * @see https://hono.dev
 */
export function createHonoServer(options: BotServerOptions) {
  const app = new Hono<{
    Bindings: Bindings
  }>()

  app.use('/api/*', cors())
  app.use(logger())
  app.use(poweredBy())

  // github webhooks: /api/github/webhooks
  if (options.webhooks?.enable)
    createWebhooks(app, options.webhooks)

  app.get('/', (c) => {
    return c.text('Hono is running! I\'m el-bot server!')
  })

  const port = options.port || 7777
  serve({
    fetch: app.fetch,
    port,
  })
  const url = `http://localhost:${port}`
  consola.success(`🔥 Hono is running:  ${colors.green(url)}`)

  return app
}
