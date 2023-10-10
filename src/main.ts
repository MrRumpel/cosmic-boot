import { join } from 'path'
import { NestFactory } from '@nestjs/core'
import { MicroserviceOptions } from '@nestjs/microservices'
import { NestExpressApplication } from '@nestjs/platform-express'
import { initialSSRDevProxy, loadConfig, getCwd } from 'ssr-common-utils'

import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { grpcClientOptions } from './grpc-client.options'
import { redisClientOptions } from './redis.options'
import { TransformInterceptor } from './core/interceptor/transform/transform.interceptor'
import { HttpExceptionFilter } from './core/filter/http-exception/http-exception.filter'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

async function bootstrap (): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  // 注册全局注册的验证
  app.useGlobalPipes(new ValidationPipe())
  // 注册全局错误的过滤器
  app.useGlobalFilters(new HttpExceptionFilter())
  // 注册全局注册的拦截器
  app.useGlobalInterceptors(new TransformInterceptor())
  // 设置swagger文档
  const config = new DocumentBuilder()
    .setTitle('管理后台')
    .setDescription('管理后台接口文档')
    .setVersion('1.0')
    .addBearerAuth()
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)
  app.connectMicroservice<MicroserviceOptions>(grpcClientOptions)
  app.connectMicroservice<MicroserviceOptions>(redisClientOptions)
  await app.startAllMicroservices()
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
