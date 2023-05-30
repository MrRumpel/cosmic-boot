import { Module } from '@nestjs/common'
import { DetailModule } from './modules/detail-page/detail.module'
import { indexModule } from './modules/index-page/index.module'
import { TestModule } from './modules/test-page/test.module';

@Module({
  imports: [DetailModule, indexModule, TestModule]
})
export class AppModule {}
