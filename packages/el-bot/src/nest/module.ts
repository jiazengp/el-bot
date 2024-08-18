import type { DynamicModule } from '@nestjs/common'
import { Module } from '@nestjs/common'
import consola from 'consola'
import type { ElConfig } from '../config'
import { ElBotService } from './service'

/**
 * @see https://docs.nestjs.com/modules#dynamic-modules
 */
@Module({
  providers: [ElBotService],
})
export class ElBotModule {
  static forRoot(_options?: ElConfig): DynamicModule {
    // const elConfig: ElConfig = {}
    consola.info('ElBotModule.forRoot')

    return {
      module: ElBotModule,
    }
  }
}
