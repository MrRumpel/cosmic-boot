import { ParseIntPipe, UseGuards } from '@nestjs/common'
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql'
import { PubSub } from 'graphql-subscriptions'
import { Cat } from './cat.schema'
import { CatsGuard } from './cats.guard'
import { CatsService } from './cats.service'
import { CreateCatDto } from './dto/create-cat.dto'

const pubSub = new PubSub()

@Resolver('Cat')
export class CatsResolver {
  constructor (private readonly catsService: CatsService) {}

  @Query('cats')
  @UseGuards(CatsGuard)
  async getCats () {
    return await this.catsService.findAll()
  }

  @Query('cat')
  async findOneById (
    @Args('id')
    id: string
  ): Promise<Cat> {
    console.info(id)
    return await this.catsService.findOne(id)
  }

  @Mutation('createCat')
  async create (@Args('createCatInput') args: CreateCatDto): Promise<Cat> {
    const createdCat = await this.catsService.create(args)
    pubSub.publish('catCreated', { catCreated: createdCat })
    return createdCat
  }

  @Subscription('catCreated')
  catCreated () {
    return pubSub.asyncIterator('catCreated')
  }
}
