// import {  } from "node-napcat-ts";

import { createHooks } from 'hookable'

export const hooks = createHooks<{
  onMessage: (msg: any) => void | Promise<void>
}>()

export function onMessage(
  handler: (msg: any) => void | Promise<void>,
) {
  hooks.hook('onMessage', handler)
}
