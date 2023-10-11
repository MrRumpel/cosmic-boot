import { ConfigService } from '@nestjs/config'
import { UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { StrategyOptions, Strategy, ExtractJwt } from 'passport-jwt'
import { User } from './user.schema'

export class JwtStorage extends PassportStrategy(Strategy) {

}
