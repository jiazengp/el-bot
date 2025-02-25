import type { BotConfig, BotUserConfig } from './bot'
import type { ElUserConfig } from './el'
import path from 'node:path'
import process from 'node:process'
import fs from 'fs-extra'
import { createLogger } from '../bot/logger/winston'

export * from './bot'
export * from './el'

// config
const logger = createLogger().child({ label: '⚙️' })

/**
 * 从文件加载配置
 */
export async function loadConfigFromFile(
  configFile?: string,
  configRoot: string = process.cwd(),
) {
  let resolvedPath: string | undefined
  // let isTS = false;
  // let isMjs = false;

  const configName = 'el'

  // check package.json for type: "module" and set `isMjs` to true
  // try {
  //   const pkg = lookupFile(configRoot, ["package.json"]);
  //   if (pkg && JSON.parse(pkg).type === "module") {
  //     isMjs = true;
  //   }
  // } catch (e) {}

  if (configFile) {
    // explicit config path is always resolved from cwd
    resolvedPath = path.resolve(configFile)
  }
  else {
    // implicit config file loaded from inline root (if present)
    // otherwise from cwd
    const jsconfigFile = path.resolve(configRoot, `${configName}.config.js`)
    if (fs.existsSync(jsconfigFile))
      resolvedPath = jsconfigFile

    if (!resolvedPath) {
      const mjsconfigFile = path.resolve(
        configRoot,
        `${configName}.config.mjs`,
      )
      if (fs.existsSync(mjsconfigFile))
        resolvedPath = mjsconfigFile
        // isMjs = true;
    }

    if (!resolvedPath) {
      const tsconfigFile = path.resolve(configRoot, `${configName}.config.ts`)
      if (fs.existsSync(tsconfigFile))
        resolvedPath = tsconfigFile
        // isTS = true;
    }

    if (!resolvedPath) {
      logger.debug('no config file found.')
      return null
    }

    try {
      const botConfig: BotConfig | undefined = await import(resolvedPath)
      return botConfig
    }
    catch (e) {
      logger.error(`无法正确加载配置文件：${resolvedPath}`)
      throw e
    }
  }
}

/**
 * el-bot.config.ts
 * 机器人全局配置
 * @param config
 */
export function defineConfig(config: ElUserConfig): ElUserConfig {
  return config
}

/**
 * Bot 配置
 * @param config
 */
export function defineBotConfig(config: BotUserConfig): BotUserConfig {
  return config
}
