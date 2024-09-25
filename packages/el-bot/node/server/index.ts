import { serve, sleep } from 'bun'
import consola from 'consola'

serve({
  async fetch(req) {
    const start = performance.now()
    await sleep(10)
    const end = performance.now()
    consola.info(req.url)
    return new Response(`Slept for ${end - start}ms`)
  },
})
