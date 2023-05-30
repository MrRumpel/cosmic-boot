/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common'
import mock from './test.mock'

export interface ResDataType {
  status: number
  message: string
  data: string
}

@Injectable()
export class ApiService {
  async login (params: {username: string, pass: string}): Promise<ResDataType> {
    return await Promise.resolve({ ...mock, data: `code:${params.username}|${params.pass}` })
  }
}
