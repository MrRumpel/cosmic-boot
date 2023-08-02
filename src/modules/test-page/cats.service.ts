import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Cat, CatDocument } from './cat.schema'

@Injectable()
export class CatsService {
  constructor (
    @InjectModel(Cat.name) private readonly CatModel: Model<CatDocument>
  ) {}

  async create (catData: Cat): Promise<Cat> {
    const createdCat = new this.CatModel(catData)
    return await createdCat.save()
  }

  async findAll (): Promise<Cat[]> {
    return await this.CatModel.find().exec()
  }

  async findOne (id: string) {
    const cat = this.CatModel.findOne({ _id: id }).exec()
    if (!cat) {
      throw new NotFoundException('Cat not found')
    }
    return await cat
  }

  async deleteOne (id: string) {
    const deletedCat = this.CatModel.findOneAndDelete({ _id: id }).exec()
    if (!deletedCat) {
      throw new NotFoundException('Cat not found')
    }
    return await deletedCat
  }

  async update (id: string, catData: Cat): Promise<Cat> {
    const updatedCat = await this.CatModel.findOneAndUpdate(
      { _id: id },
      catData,
      { new: true }
    ).exec()

    if (!updatedCat) {
      throw new NotFoundException('Cat not found')
    }

    return updatedCat
  }

  async updateAll (id: string, catData: Cat): Promise<Cat> {
    const updatedAllCat = await this.CatModel.findOneAndReplace(
      { _id: id },
      catData,
      { new: true }
    ).exec()

    if (!updatedAllCat) {
      throw new NotFoundException('Cat not found')
    }

    return updatedAllCat
  }
}
