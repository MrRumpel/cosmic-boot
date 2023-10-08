import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { hashPassword } from '~/src/common/utils/pwdUtils'

export type UserDocument = User & Document

enum UserRole {
  ROOT = 'root',
  AUTHOR = 'author',
  VISITOR = 'visitor',
}

@Schema()
export class User {
  @Prop({ required: true })
  name: string;

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

  @Prop({type: String, enum: UserRole})
  role: string; // 用户角色

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;

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
