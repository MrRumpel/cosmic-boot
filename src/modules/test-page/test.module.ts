/* eslint-disable @typescript-eslint/no-extraneous-class */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Module } from '@nestjs/common'
import { ApiController } from './api.controller'
import { ApiService } from './test.service'
import { TestController } from './test.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Cat, CatSchema } from './cat.schema'
import { CatsController } from './cats.controller'
import { CatsService } from './cats.service'

@Module({
  imports: [
  MongooseModule.forRoot("mongodb://nestJs:nestJs@localhost:27017/nestjs-mongodb"),
  MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),
  ],
  controllers: [TestController, ApiController, CatsController],
  providers: [ApiService, CatsService],
  })
export class TestModule {}
