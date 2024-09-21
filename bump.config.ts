import { defineConfig } from 'bumpp'

const packages = [
  'el-bot',
]

export default defineConfig({
  all: true,
  commit: true,
  tag: true,
  push: true,

  files: [
    ...packages.map(pkg => `packages/${pkg}/package.json`),
  ],
})
