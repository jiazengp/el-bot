// import {  } from "node-napcat-ts";

import { currentInstance } from './litecycle'

/**
 * listen to all message
 * - napcat
 * - TODO
 * @param handler
 */
export function onMessage(
  handler: (msg: any) => void | Promise<void>,
) {
  currentInstance?.hooks.hook('onMessage', handler)
}

/**
 * only listen to napcat message
 * @param handler
 */
export function onNapcatMessage(
  handler: (msg: any) => void | Promise<void>,
) {
  currentInstance?.hooks.hook('onNapcatMessage', handler)
}
