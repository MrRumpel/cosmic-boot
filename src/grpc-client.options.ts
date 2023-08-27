import { ClientOptions, Transport } from '@nestjs/microservices'
import { join } from 'path'

export const grpcClientOptions: ClientOptions = {
  transport: Transport.GRPC,
  options: {
    url: 'localhost:50051',
    package: 'hero', // ['hero', 'hero2']
    protoPath: join(__dirname, './modules/test-page/hero/hero.proto'), // ['./hero/hero.proto', './hero/hero2.proto']
    loader: {
      arrays: true,
      includeDirs: ['./modules/test-page/hero/'] // 替换成你的 protobuf 文件路径
    }
  }
}
