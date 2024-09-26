// import {  } from "node-napcat-ts";

import { GroupMessage, PrivateMessage } from 'node-napcat-ts'
import { currentInstance } from './lifecycle'

export type NapcatMessage = PrivateMessage | GroupMessage
export type CommonMessage = NapcatMessage

export interface LiteCycleHook {
  onMessage: (msg: any) => void | Promise<void>
  onNapcatMessage: (msg: any) => void | Promise<void>
  onPrivateMessage: (msg: any) => void | Promise<void>
  onGroupMessage: (msg: any) => void | Promise<void>
}

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

/**
 * listen to private message
 * @param handler
 */
export function onPrivateMessage(
  handler: (msg: PrivateMessage) => void | Promise<void>,
) {
  currentInstance?.hooks.addHooks({
    onPrivateMessage: handler,
  })
}

/**
 * listen to group message
 * @param handler
 */
export function onGroupMessage(
  handler: (msg: GroupMessage) => void | Promise<void>,
) {
  currentInstance?.hooks.addHooks({
    onGroupMessage: handler,
  })
}
