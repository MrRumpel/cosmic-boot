import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { IsNotEmpty, Length, Min } from 'class-validator'
import { Document } from 'mongoose'
import { hashPassword } from '~/src/common/utils/pwdUtils'

export type UserDocument = User & Document

enum UserRole {
  ROOT = 'root',
  ADMIN = 'admin',
  USER = 'user',
  AUTHOR = 'author',
  VISITOR = 'visitor',
}

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

  @IsNotEmpty({ message: "用户名必填" })
  @Length(3, 20, { message: "用户名长度3-20位" })
  @Prop({ required: true })
  username: string;

  @Prop()
  nickname: string; // 昵称

  @Prop({ required: true })
  password: string; // 密码

  @Prop()
  avatar: string; // 头像

  @Prop()
  email: string;

  @Prop({ type: String, enum: UserRole })
  role: string; // 用户角色

  @Prop({ default: Date.now })
  createdTime: Date;

  @Prop({ default: Date.now })
  updatedTime: Date;

  // 隐藏的字段可以在这里定义
  static hiddenFields = ['password'];
}

export const UserSchema = SchemaFactory.createForClass(User)

// Use the 'pre' hook to update the 'updatedAt' field before saving the document
UserSchema.pre('findOneAndUpdate', function (next) {
  this.findOneAndUpdate({}, { $set: { updatedAt: new Date() } })
  next()
})

// Use the 'pre' hook to update the 'updatedAt' field before saving the document
UserSchema.pre('save', function (next) {
  this.password = hashPassword(this.password)
  next()
})
