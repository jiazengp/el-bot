import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import consola from 'consola'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())

  await app.listen(3000)
  consola.info(`Application is running on: ${await app.getUrl()}`)
}

bootstrap()
