import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import fs from 'fs-extra'

import { getAllPlugins } from './utils'

const plugins = getAllPlugins()

const __dirname = dirname(fileURLToPath(import.meta.url))

export async function copy() {
  for (const item of plugins) {
    const source = path.resolve(__dirname, '../src/plugins/', item, 'index.ts')
    const pluginDestDir = path.resolve(__dirname, '../dist/plugins', item)

    await fs.ensureDir(pluginDestDir)
    const dest = path.resolve(pluginDestDir, 'index.ts')
    fs.copyFileSync(source, dest)
  }
}

copy()
