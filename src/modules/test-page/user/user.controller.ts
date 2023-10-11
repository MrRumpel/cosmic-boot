import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Put,
  Patch,
  HttpCode,
  ValidationPipe,
  ClassSerializerInterceptor,
  Req,
  UseGuards,
  UseInterceptors
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AuthGuard } from '@nestjs/passport'
import { User } from './user.schema'
import { UserService } from './user.service'

@Controller("user")
export class UserController {
  constructor (private readonly jwtService: JwtService, private readonly UserService: UserService) {}
  // 生成token
  createToken (user: Partial<User>) {
    return this.jwtService.sign(user)
  }

  @Post("register")
  @HttpCode(201)
  async create (@Body(new ValidationPipe()) userData: User): Promise<User> {
    return await this.UserService.create(userData)
  }

  @UseGuards(AuthGuard("local"))
  @UseInterceptors(ClassSerializerInterceptor)
  @Post("login")
  async login (@Body() user: User, @Req() req) {
    const token = this.createToken({
      username: user.username,
      name: user.name,
      role: user.role
    })

    return token
  }

}
