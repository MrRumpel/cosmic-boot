import { message } from 'antd'
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
  UseInterceptors,
  UploadedFile
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { AuthGuard } from '@nestjs/passport'
import { FileInterceptor } from '@nestjs/platform-express'
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation
} from '@nestjs/swagger'
import { Roles, RolesGuard } from './role.guard'
import { User } from './user.schema'
import { UserService } from './user.service'
import fs from 'fs'
@Controller("user")
export class UserController {
  constructor (
    private readonly jwtService: JwtService,
    private readonly UserService: UserService
  ) {}

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

  @ApiOperation({ summary: "获取用户信息" })
  @ApiBearerAuth() // swagger文档设置token
  @UseGuards(AuthGuard("jwt"))
  @Get("getUserInfo")
  getUserInfo (@Req() req) {
    return req.user
  }

  @ApiBearerAuth()
  @Get("testRole")
  @Roles("admin", "root")
  @UseGuards(AuthGuard("jwt"), RolesGuard)
  testUserRole (@Req() req) {
    return req.user
  }

  @Post("upload")
  @ApiOperation({ summary: "上传文件" })
  @ApiConsumes("multipart/form-data")
  @UseInterceptors(FileInterceptor("file"))
  @ApiBody({
    schema: {
    type: "object",
    properties: {
    file: {
    type: "string",
    format: "binary",
    },
    },
    },
    })
  async uploadFile (@UploadedFile("file") file: Express.Multer.File) {
    console.info(file)
    await fs.writeFile('dist/' + file.originalname, file.buffer, 'utf8', error => {
      if (error) {
        throw new Error('写入文件出错：' + error.message)
      } else {
        console.log('文件写入成功\n')
        console.log('The written has the following contents:')
        console.log(fs.readFileSync('dist/' + file.originalname, 'utf8'))
      }
    })
  }
}
