import { Webhooks } from '@octokit/webhooks'
import consola from 'consola'
import colors from 'picocolors'
import { OctokitOptions } from './types'

/**
 * @see https://github.com/octokit/webhooks.js#local-development
 * @see https://smee.io/ Start a new channel
 */
export function localDevForWebhook(webhooks: Webhooks) {
  const webhookProxyUrl = 'https://smee.io/IrqK0nopGAOc847' // replace with your own Webhook Proxy URL
  const source = new EventSource(webhookProxyUrl)
  source.onmessage = (event) => {
    const webhookEvent = JSON.parse(event.data)
    webhooks
      .verifyAndReceive({
        id: webhookEvent['x-request-id'],
        name: webhookEvent['x-github-event'],
        signature: webhookEvent['x-hub-signature'],
        payload: JSON.stringify(webhookEvent.body),
      })
      .catch(console.error)
  }
}

/**
 * create octokit webhooks
 */
export function createOctokitWebhooks(octokitOptions: OctokitOptions) {
  const webhooks = new Webhooks({
    secret: octokitOptions.secret || 'el-psy-congroo',
  })

  webhooks.onAny(({ id, name, payload }) => {
    consola.info(`🪝  ${colors.green(name)} event received: ${colors.green(id)}`)
    // eslint-disable-next-line no-console
    console.dir(payload)
  })

  return webhooks
}
