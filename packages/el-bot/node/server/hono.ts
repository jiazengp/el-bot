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
import colors from 'picocolors'

export type Bindings = HttpBindings
export type BotServer = Hono<{
  Bindings: Bindings
}>

/**
 * @see https://hono.dev
 */
export function createHonoServer(port = 7777) {
  const app = new Hono<{
    Bindings: Bindings
  }>()

  app.get('/', c => c.text('Hono is running! I\'m el-bot server!'))
  app.use('/api/*', cors())

  serve({
    fetch: app.fetch,
    port,
  })
  const url = `http://localhost:${port}`
  consola.success(`🔥 Hono is running at ${colors.green(url)}`)

  return app
}
