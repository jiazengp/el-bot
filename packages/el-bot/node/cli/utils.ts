import process from 'node:process'
import * as readline from 'node:readline'
import { blue, bold, dim, underline } from 'picocolors'
import { version } from '../../package.json'

export function printInfo() {
  console.log()
  console.log(`  ${bold('🤖 El Bot')}  ${blue(`v${version}`)}`)
  console.log()
  // console.log(`  ${dim('📁')} ${dim(path.resolve(options.userRoot))}`)
  console.log()
  const restart = `${underline('r')}${dim('estart')}`
  const edit = `${underline('e')}${dim('dit')}`
  const divider = `${dim(' | ')}`
  console.log(`${dim('  shortcuts ')} > ${restart}${divider}${edit}`)
  console.log()
}

/**
 * bind shortcut for terminal
 */
export function bindShortcut(SHORTCUTS: { name: string, fullName: string, action: () => void }[]) {
  process.stdin.resume()
  process.stdin.setEncoding('utf8')
  readline.emitKeypressEvents(process.stdin)
  if (process.stdin.isTTY)
    process.stdin.setRawMode(true)

  process.stdin.on('keypress', (str, key) => {
    if (key.ctrl && key.name === 'c') {
      process.exit()
    }
    else {
      const [sh] = SHORTCUTS.filter(item => item.name === str)
      if (sh) {
        try {
          sh.action()
        }
        catch (err) {
          console.error(`Failed to execute shortcut ${sh.fullName}`, err)
        }
      }
    }
  })
}
