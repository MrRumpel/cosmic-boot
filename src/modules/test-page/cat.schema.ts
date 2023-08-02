import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type CatDocument = Cat & Document

@Schema()
export class Cat {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  age: number;

  @Prop({ required: true })
  breed: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ default: Date.now })
  updatedAt: Date;
}

export const CatSchema = SchemaFactory.createForClass(Cat)

// Use the 'pre' hook to update the 'updatedAt' field before saving the document
CatSchema.pre('findOneAndUpdate', function (next) {
  this.findOneAndUpdate({}, { $set: { updatedAt: new Date() } })
  next()
})
