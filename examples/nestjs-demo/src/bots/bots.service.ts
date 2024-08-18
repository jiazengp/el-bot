import { Injectable, OnModuleInit } from '@nestjs/common'
import consola from 'consola'

@Injectable()
export class BotsService implements OnModuleInit {
  onModuleInit(): void {
    consola.info('BotsService initialized')
  }
}
