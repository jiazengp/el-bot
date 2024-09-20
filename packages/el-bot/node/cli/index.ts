import process from 'node:process'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'

import { version } from '../../package.json'
import { registerDevCommand } from './commands/dev'

export const cli = yargs(hideBin(process.argv))
  .scriptName('el-bot')
  .usage('Usage: $0 <command> [options]')
  .version(version)
  .showHelpOnFail(true)
  .alias('h', 'help')
  .alias('v', 'version')

registerDevCommand(cli)

/**
 * run cli for bin
 */
export function run() {
  cli.help().parse()
}
