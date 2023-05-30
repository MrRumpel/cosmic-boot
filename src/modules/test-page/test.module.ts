/* eslint-disable @typescript-eslint/no-extraneous-class */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Module } from '@nestjs/common'
import { ApiController } from './api.controller'
import { ApiService } from './test.service'
import { TestController } from './test.controller'

@Module({
  imports: [

  ],
  controllers: [TestController, ApiController],
  providers: [ApiService]
  })

export class TestModule {}
