import { compareSync } from 'bcryptjs'
import { PassportStrategy } from '@nestjs/passport'
import { IStrategyOptions, Strategy } from 'passport-local'
import { User, UserDocument } from './user.schema'
import { BadRequestException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

export class LocalStorage extends PassportStrategy(Strategy) {
  constructor (
    @InjectModel(User.name) private readonly UserModel: Model<UserDocument>
  ) {
    super({
      usernameField: 'username',
      passwordField: 'password'
    } as IStrategyOptions)
  }

  async validate (username: string, password: string) {
    const user = await this.UserModel.findOne({ username }).exec()

    if (!user) {
      throw new BadRequestException('用户名不正确！')
    }

    if (!compareSync(password, user.password)) {
      throw new BadRequestException('密码错误！')
    }

    return user.toJSON()
  }
}
