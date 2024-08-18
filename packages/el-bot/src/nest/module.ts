import type { DynamicModule } from '@nestjs/common'
import { Module } from '@nestjs/common'
import type { ElConfig } from '../config'
import { ElBotService } from './service'

/**
 * @see https://docs.nestjs.com/modules#dynamic-modules
 */
@Module({
  providers: [ElBotService],
})
export class ElBotModule {
  static forRoot(_options: ElConfig): DynamicModule {
    return {
      module: ElBotModule,
    }
  }
}
