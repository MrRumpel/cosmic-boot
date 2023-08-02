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
import { DateScalar, GraphQLISODateTimeScalar } from '~/src/common/scalars/date.scalar'

@Module({
  imports: [
  MongooseModule.forRoot("mongodb://nestJs:nestJs@localhost:27017/nestjs-mongodb"),
  MongooseModule.forFeature([{ name: Cat.name, schema: CatSchema }]),
  GraphQLModule.forRoot<ApolloDriverConfig>({
    driver: ApolloDriver,
    typePaths: ['./**/*.graphql'],
    transformSchema: schema => upperDirectiveTransformer(schema, 'upper'),
    installSubscriptionHandlers: true,
    buildSchemaOptions: {
    dateScalarMode: 'timestamp',
    }
    }),
  ],
  controllers: [TestController, ApiController, CatsController],
  providers: [ApiService, CatsService, OwnersService, CatsResolver, CatOwnerResolver, DateScalar],
  })
export class TestModule {}
