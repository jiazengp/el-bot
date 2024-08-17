import fs from 'node:fs'
import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export function getAllPlugins() {
  const plugins = fs.readdirSync(path.resolve(__dirname, '../src/plugins'))
  return plugins
}
