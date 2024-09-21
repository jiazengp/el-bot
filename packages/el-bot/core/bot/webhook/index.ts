import type { Server } from 'node:net'
import events from 'node:events'
import cors from '@koa/cors'
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import colors from 'picocolors'
import { type Bot, logger } from '..'

import { handleError } from '../../utils/error'
// import * as octokit from '@octokit/webhooks'
// import { githubHandler } from './github-handler'

export interface WebhookConfig {
  /**
   * 是否启用
   */
  enable?: boolean
  port?: number
  path?: string
  secret?: string
  /**
   * 回调函数
   */
  callback?: (webhook: any) => void
}

/**
 * 收到的内容
 */
interface ContextBody {
  /**
   * 定义类型
   */
  type: string
  [propName: string]: any
}

/**
 * webhook
 */
export default class Webhook {
  // 默认配置
  config: WebhookConfig
  emitter: events.EventEmitter

  server?: Server
  // githubHandler: octokit.Webhooks<any>

  // middleware: (
  //   request: any,
  //   response: any,
  //   next?: Koa.Next
  // ) => Promise<any>

  constructor(public ctx: Bot) {
    this.config = ctx.el.webhook!
    this.emitter = new events.EventEmitter()
    // const { handler, middleware } = githubHandler(ctx)
    // this.githubHandler = handler
    // this.middleware = middleware
  }

  /**
   * 启动 webhhook
   */
  start(config?: WebhookConfig) {
    if (config)
      this.config = Object.assign(this.config)

    const app = new Koa()
    app.use(cors())
    app.use(bodyParser())
    // app.use((ctx, next) => {
    //   ctx.body = (ctx.request as any).body;
    //   (ctx.req as any).body = ctx.body
    //   ctx.status = 200
    //   return this.middleware(ctx.req, ctx.res, next)
    // })

    app.use((ctx) => {
      this.parse(ctx)
    })

    if (this.server) {
      this.server.close()
    }

    try {
      this.server = app.listen(this.config.port)
      this.ctx.logger.success(
        `Webhook Listening ${colors.cyan(`http://localhost:${this.config.port}`)}`,
      )
    }
    catch (err) {
      handleError(err)
    }
    return this.server
  }

  stop() {
    if (this.server) {
      this.server?.close()
      logger.success('Webhook 服务已关闭')
    }
  }

  /**
   * response
   * @param ctx
   */
  parse(ctx: Koa.ParameterizedContext<Koa.DefaultState, Koa.DefaultContext>) {
    let type = ''
    const body = ctx.body as ContextBody
    if (ctx.request.method === 'GET' && ctx.request.query.type) {
      type = ctx.request.query.type as string
      this.emitter.emit(type, ctx.request.query, ctx.res)
    }
    else if (ctx.request.method === 'POST' && body.type) {
      type = body.type
      this.emitter.emit(type, ctx.body, ctx.res)
      this.ctx.logger.info(`[webhook](${type})`)
      if (this.ctx.isDev) {
        this.ctx.logger.info(
          `[webhook](ctx.body): ${JSON.stringify(ctx.body)}`,
        )
      }
    }
    else {
      this.ctx.logger.error('[webhook] 收到未知类型的请求')
    }
  }

  /**
   * 监听
   * @param type 类型
   * @param callback 回调函数
   */
  on(type: string, callback: (data: any, res: any) => void) {
    // data 为解析后的参数
    // res 为返回信息
    this.emitter.on(type, (data, res) => {
      callback(data, res)
    })
  }
}
