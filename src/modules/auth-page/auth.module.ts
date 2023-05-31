/* eslint-disable @typescript-eslint/no-extraneous-class */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Module } from '@nestjs/common'
import { AuthController } from './auth.controller'

@Module({
  imports: [

  ],
  controllers: [AuthController, ],
  providers: []
  })

export class AuthModule {}
