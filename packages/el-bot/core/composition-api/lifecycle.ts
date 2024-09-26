import { Bot } from '../../types'

/**
 * Current bot instance
 * @internal
 */
// eslint-disable-next-line import/no-mutable-exports
export let currentInstance: Bot | null = null

/**
 * @internal
 */
export function setCurrentInstance(instance: Bot | null) {
  currentInstance = instance
}

/**
 * @internal
 */
export function unsetCurrentInstance() {
  currentInstance = null
}

/**
 * @internal
 */
export function getCurrentInstance() {
  if (!currentInstance) {
    throw new Error('getCurrentInstance called when no active instance.')
  }
  return currentInstance
}
