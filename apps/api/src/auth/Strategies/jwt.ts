import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy as Jwt } from 'passport-jwt'
export class JwtStrategy extends PassportStrategy(Jwt, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    })
  }
  success(user: any, info?: any): void {
    return user
  }
}
