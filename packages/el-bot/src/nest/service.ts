import type { ElConfig } from '../config'

import { Injectable, Logger, OnModuleInit } from '@nestjs/common'
import { loadConfig } from 'c12'
import { Bot } from '../bot'

@Injectable()
export class ElBotService implements OnModuleInit {
  public bot: Bot | undefined

  async onModuleInit() {
    const { config: elConfig } = await loadConfig<ElConfig>({
      configFile: 'el-bot.config',
    })

    this.bot = new Bot(elConfig)

    // await this.bot.start()
    Logger.debug('Bot start')
  }
}
