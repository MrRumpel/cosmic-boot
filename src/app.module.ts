import { Module } from '@nestjs/common'
import { AuthModule } from './modules/auth-page/auth.module'
import { DetailModule } from './modules/detail-page/detail.module'
import { indexModule } from './modules/index-page/index.module'
import { TestModule } from './modules/test-page/test.module'

@Module({
  imports: [DetailModule, indexModule, TestModule, AuthModule],
  })
export class AppModule {}
