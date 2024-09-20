import { Module, OnModuleInit } from '@nestjs/common'
import { AppService } from './app.service'
// import { ElBotModule } from 'el-bot'
import { BotsModule } from './bots/bots.module'
import { CoreModule } from './core/core.module'

@Module({
  imports: [
    BotsModule,
    CoreModule,
    // ElBotModule.forRoot(),
  ],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  onModuleInit(): void {
    // eslint-disable-next-line no-console
    console.log('AppModule initialized')
  }
}
