import fs from 'node:fs'
import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

import { getAllPlugins } from './utils'

const plugins = getAllPlugins()

const __dirname = dirname(fileURLToPath(import.meta.url))

plugins.forEach((item) => {
  const source = path.resolve(__dirname, '../src/plugins/', item, 'package.json')
  const dest = path.resolve(__dirname, '../dist/plugins', item, 'package.json')
  fs.copyFileSync(source, dest)
})
