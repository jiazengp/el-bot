import consola from 'consola'
import { createHooks } from 'hookable'

// Create a hookable instance
const hooks = createHooks()

// Hook on 'hello'
hooks.addHooks({
  hello: () => {
    consola.info('Hello World 1')
  },
})

hooks.addHooks({
  hello: () => {
    consola.info('Hello World 2')
  },
})

hooks.addHooks({
  hello: () => {
    consola.info('Hello World 3')
  },
})

// Call 'hello' hook
hooks.callHook('hello')
