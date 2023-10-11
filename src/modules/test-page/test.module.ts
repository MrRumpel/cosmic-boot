/* eslint-disable @typescript-eslint/no-extraneous-class */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { join } from 'path'
import { Module } from '@nestjs/common'
import { ApiController } from './api.controller'
import { ApiService } from './test.service'
import { TestController } from './test.controller'
import { MongooseModule } from '@nestjs/mongoose'
import { Cat, CatSchema } from './cat.schema'
import { CatsController } from './cats.controller'
import { CatsService } from './cats.service'
import { GraphQLModule } from '@nestjs/graphql'
import { ApolloDriverConfig, ApolloDriver } from '@nestjs/apollo'
import { upperDirectiveTransformer } from '~/src/common/directives/upper-case.directive'
import { OwnersService } from './owners.service'
import { CatsResolver } from './cats.resolver'
import { CatOwnerResolver } from './cat-owner.resolver'
import { DateScalar } from '~/src/common/scalars/date.scalar'
import { HeroController } from './hero/hero.controller'
import { ClientsModule } from '@nestjs/microservices'
import { grpcClientOptions } from '../../grpc-client.options'
import { User, UserSchema } from './user/user.schema'
import { UserController } from './user/user.controller'
import { UserService } from './user/user.service'
import { LocalStorage } from './user/local.strategy'
import { PassportModule } from '@nestjs/passport'
import { JwtModule } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { JwtStorage } from './user/jwt.strategy'

const jwtModule = JwtModule.register({
  secret: 'test123456',
  signOptions: { expiresIn: '4h' }
})

@Module({
  imports: [
  jwtModule,
  MongooseModule.forRoot(
    "mongodb://nestJs:nestJs@localhost:27017/nestjs-mongodb"
  ),
  MongooseModule.forFeature([
    { name: Cat.name, schema: CatSchema },
    { name: User.name, schema: UserSchema },
    ]),
  GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    typePaths: ["./**/*.graphql"],
    transformSchema: (schema) => upperDirectiveTransformer(schema, "upper"),
    installSubscriptionHandlers: true,
    buildSchemaOptions: {
    dateScalarMode: "timestamp",
    },
    }),
  ClientsModule.register([
    {
    name: "HERO_PACKAGE",
    ...grpcClientOptions,
    },
    ]),
  PassportModule,
  ],
  controllers: [TestController, ApiController, CatsController, HeroController, UserController],
  providers: [
  ApiService,
  CatsService,
  UserService,
  OwnersService,
  CatsResolver,
  CatOwnerResolver,
  DateScalar,
  LocalStorage,
  JwtStorage
  ],
  exports: [jwtModule]
  })
export class TestModule {}
