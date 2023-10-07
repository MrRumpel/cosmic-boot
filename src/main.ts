import { join } from 'path'
import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions } from '@nestjs/microservices'
import { NestExpressApplication } from '@nestjs/platform-express'
import { initialSSRDevProxy, loadConfig, getCwd } from 'ssr-common-utils'

import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { grpcClientOptions } from './grpc-client.options'
import { redisClientOptions } from './redis.options'

async function bootstrap (): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  app.connectMicroservice<MicroserviceOptions>(grpcClientOptions)
  app.connectMicroservice<MicroserviceOptions>(redisClientOptions)
  await app.startAllMicroservices()
  app.useGlobalPipes(new ValidationPipe())
  await initialSSRDevProxy(app)
  app.useStaticAssets(join(getCwd(), './build'))
  app.useStaticAssets(join(getCwd(), './public'))
  app.useStaticAssets(join(getCwd(), './build/client'))
  app.useStaticAssets(join(getCwd(), './public'))
  const { serverPort } = loadConfig()
  await app.listen(serverPort)
  console.log(`Application is running on: ${await app.getUrl()}`)
}

bootstrap().catch(err => {
  console.log(err)
  process.exit(1)
})
