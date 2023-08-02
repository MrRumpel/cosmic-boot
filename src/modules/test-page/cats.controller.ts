import { Controller, Get, Post, Body, Delete, Param, Put, Patch, HttpCode } from '@nestjs/common'
import { CatsService } from './cats.service'
import { Cat } from './cat.schema'

@Controller('cats')
export class CatsController {
  constructor (private readonly catsService: CatsService) {}

  @Post()
  @HttpCode(201)
  async create (@Body() catData: Cat): Promise<Cat> {
    return await this.catsService.create(catData)
  }

  @Get()
  async findAll (): Promise<Cat[]> {
    return await this.catsService.findAll()
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteOne (@Param('id') id: string) {
    return await this.catsService.deleteOne(id)
  }

  @Get(':id')
  async findOne (@Param('id') id: string) {
    return await this.catsService.findOne(id)
  }

  @Patch(':id')
  async update (@Param('id') id: string, @Body() catData: Cat): Promise<Cat> {
    return await this.catsService.update(id, catData)
  }

  @Put(':id')
  async updateAll (@Param('id') id: string, @Body() catData: Cat): Promise<Cat> {
    return await this.catsService.updateAll(id, catData)
  }
}
