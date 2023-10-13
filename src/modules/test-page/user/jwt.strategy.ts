import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { StrategyOptions, Strategy, ExtractJwt } from 'passport-jwt'
import { User } from './user.schema'
import { UserService } from './user.service'
@Injectable()
export class JwtStorage extends PassportStrategy(Strategy) {

  constructor (private readonly userService: UserService) {
    super({ jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey: 'test123456' } as StrategyOptions)
  }

  async validate (user: User) {
    console.info(user)
    const existUser = await this.userService.getUser(user)
    if (!existUser) {
      throw new UnauthorizedException('token不正确')
    }
    return existUser
  }

}
