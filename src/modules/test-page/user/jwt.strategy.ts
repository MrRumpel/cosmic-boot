import { UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { StrategyOptions, Strategy, ExtractJwt } from 'passport-jwt'
import { User } from './user.schema'
import { UserService } from './user.service'
export class JwtStorage extends PassportStrategy(Strategy) {
  constructor (private readonly UserService: UserService) {
    super({ jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), secretOrKey: 'test123456' })
  }

  async validate (user: User) {
    const existUser = await this.UserService.getUser(user)
    if (!existUser) {
      throw new UnauthorizedException('token不正确')
    }
    return existUser
  }

}
