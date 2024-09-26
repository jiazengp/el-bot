import { createNodeMiddleware } from '@octokit/webhooks'

/**
 * GitHub Webhooks Specific
 * @see https://github.com/octokit/webhooks
 */
export interface OctokitOptions {
  /**
   * used when `new Webhooks({ secret })`
   * Required. Secret as configured in GitHub Settings.
   * @see https://github.com/user/repo/settings/hooks/new
   */
  secret: string
  /**
   * path @default /api/github/webhooks
   */
  middlewareOptions?: Parameters<typeof createNodeMiddleware>[1]
}

export interface WebhooksOptions {
  /**
   * 是否启用
   */
  enable?: boolean
  port?: number
  /**
   * GitHub Webhooks Specific
   * @see https://github.com/octokit/webhooks
   */
  octokit: OctokitOptions
  /**
   * 回调函数
   */
  callback?: (webhook: any) => void
}
