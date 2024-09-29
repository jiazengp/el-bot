import { Webhooks } from '@octokit/webhooks'
import consola from 'consola'
import { Structs } from 'node-napcat-ts'
import colors from 'picocolors'
import { getCurrentInstance } from '../../../core'
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
    consola.debug(payload)
    consola.box(`🪝  ${colors.green(name)} event received: ${colors.dim(id)}`)
  })

  webhooks.on('push', ({ payload }) => {
    const compareDiffCommit = payload.compare.split('/').pop()
    const messages = [
      `🔗: ${`${colors.dim(payload.repository.url)}/compare/${colors.yellow(compareDiffCommit)}`}`,
      `🤺: ${colors.green(payload.pusher.username || payload.pusher.name)}<${colors.dim(payload.pusher.email)}>`,
      `📦: ${colors.cyan(payload.repository.url)}`,
      `💬: ${payload.head_commit?.message} ${colors.dim('by')} ${colors.dim(payload.head_commit?.author.username)}`,
    ]
    consola.box(messages.join('\n'))

    // TODO: send message to qq
    const ctx = getCurrentInstance()
    const { napcat } = ctx
    const plainMessages = [
      `🔗: ${payload.repository.url}/compare/${compareDiffCommit}`,
      `🤺: ${payload.pusher.username || payload.pusher.name}<${payload.pusher.email}>`,
      `📦: ${payload.repository.url}`,
      `💬: ${payload.head_commit?.message} by ${payload.head_commit?.author.username}`,
    ]
    napcat.send_group_msg({
      group_id: 120117362,
      message: [
        Structs.text(plainMessages.join('\n')),
      ],
    })
  })

  return webhooks
}
