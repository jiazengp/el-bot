// import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import consola from 'consola'
import pkg from '../package.json'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  // app.useGlobalPipes(new ValidationPipe())

  app.enableShutdownHooks()
  await app.listen(3000)

  // const url = await app.getUrl()
  // consola.info(`Application is running on: ${url}`)
  consola.info(`Version: ${pkg.version}`)
}

bootstrap()
