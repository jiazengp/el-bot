import type { OnModuleInit } from '@nestjs/common'
import { Injectable, Logger } from '@nestjs/common'

// import consola from 'consola'

@Injectable()
export class ElBotService implements OnModuleInit {
  /**
   * 当前 Bot
   */
  // private readonly bot = new Bot(el)

  async onModuleInit() {
    // await this.bot.start()
    Logger.debug('Bot start')
  }
}
