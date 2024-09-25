// import {  } from "node-napcat-ts";

import { GroupMessage, PrivateMessage } from 'node-napcat-ts'
import { currentInstance } from './litecycle'

export type NapcatMessage = PrivateMessage | GroupMessage
export type CommonMessage = NapcatMessage

/**
 * listen to all message
 * - napcat
 * - TODO: other platform
 * @param handler
 */
export function onMessage(
  handler: (msg: NapcatMessage) => void | Promise<void>,
) {
  // consola.info('onMessage', handler)
  currentInstance?.hooks.addHooks({
    onMessage: handler,
  })
}

/**
 * only listen to napcat message
 * @param handler
 */
export function onNapcatMessage(
  handler: (msg: NapcatMessage) => void | Promise<void>,
) {
  currentInstance?.hooks.addHooks({
    onNapcatMessage: handler,
  })
}
