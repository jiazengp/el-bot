import { Module } from '@nestjs/common'
import { ElBotModule } from 'el-bot'
import { BotsService } from './bots.service'
// import { ElModule } from './el/el.module'

@Module({
  imports: [
    // ElModule,
    ElBotModule,
  ],
  providers: [BotsService],
})
export class BotsModule {}
