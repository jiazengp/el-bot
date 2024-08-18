import { defineConfig } from 'tsup'

export default defineConfig({
  entry: [
    'src/index.ts',
    'src/cli/index.ts',
    'src/bot/plugins.ts',
  ],
  clean: true,
  dts: true,
  minify: true,
  format: ['esm', 'cjs'],
})
