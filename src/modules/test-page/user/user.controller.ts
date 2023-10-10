import { Controller, Get, Post, Body, Delete, Param, Put, Patch, HttpCode, ValidationPipe } from '@nestjs/common'
import { User } from './user.schema'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor (private readonly UserService: UserService) {}

  @Post('register')
  @HttpCode(201)
  async create (@Body(new ValidationPipe()) userData: User): Promise<User> {
    return await this.UserService.create(userData)
  }
}
