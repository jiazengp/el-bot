import { defineConfig } from 'tsup'

export default defineConfig((options) => {
  return {
    entry: [
      'src/index.ts',
      'src/cli/index.ts',
      'src/bot/plugins.ts',
    ],
    clean: true,
    dts: true,
    minify: !options.watch,
    format: ['esm', 'cjs'],
  }
})
