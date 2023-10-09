import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException
} from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { User, UserDocument } from './user.schema'

@Injectable()
export class UserService {
  constructor (
    @InjectModel(User.name) private readonly UserModel: Model<UserDocument>
  ) {}

  async findUserById (userId: string): Promise<User> {
    const user = await this.UserModel.findById(userId).select('-' + User.hiddenFields.join(' ')).exec()
    return user
  }

  async create (createUser: User): Promise<User> {
    const { username } = createUser

    const existUser = await this.UserModel.findOne({ username }).exec()

    if (existUser) {
      throw new HttpException('用户名已存在', HttpStatus.BAD_REQUEST)
    }

    const newUser = new this.UserModel(createUser).save()
    return await this.findUserById((await newUser).id)
  }
}
