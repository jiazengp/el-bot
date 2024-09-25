import { Bot } from '../types'

/**
 * Current bot instance
 */
// eslint-disable-next-line import/no-mutable-exports
export let currentInstance: Bot | null = null

export function setCurrentInstance(instance: Bot | null) {
  currentInstance = instance
}

export function unsetCurrentInstance() {
  currentInstance = null
}

export function getCurrentInstance() {
  if (!currentInstance) {
    throw new Error('getCurrentInstance called when no active instance.')
  }
  return currentInstance
}
