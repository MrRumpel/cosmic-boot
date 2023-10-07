import { ClientOptions, Transport } from '@nestjs/microservices'

export const redisClientOptions: ClientOptions = {
  transport: Transport.REDIS,
  options: {
    host: 'localhost',
    port: 6379
  }
}
