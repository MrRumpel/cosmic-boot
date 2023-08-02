import { Parent, ResolveField, Resolver } from '@nestjs/graphql'
import { Cat, Owner } from '~/src/graphql.schema'
import { OwnersService } from './owners.service'

@Resolver('Cat')
export class CatOwnerResolver {
  constructor (private readonly ownersService: OwnersService) {}

  @ResolveField()
  async owner (@Parent() cat: Cat & { ownerId: number }): Promise<Owner> {
    return this.ownersService.findOneById(cat.ownerId)
  }
}
