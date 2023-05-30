/* eslint-disable @typescript-eslint/no-unused-vars */

import { Controller, Get, Query } from '@nestjs/common'
import { ApiService } from './test.service'

@Controller('/api')
export class ApiController {
  constructor (private readonly apiService: ApiService) {}

  @Get('/login')
  async getLogin (@Query() params: {username: string, pass: string}): Promise<any> {
    console.info(params)
    return await this.apiService.login(params)
  }
}
