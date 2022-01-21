import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy as Github } from 'passport-github2'

@Injectable()
export class GithubStrategy extends PassportStrategy(Github, 'github') {
  public constructor() {
    super({
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackUrl: '/api/auth/callback',
      scopes: ['user:email'],
    })
  }
  async validate(_accessToken: string, _refreshToken: string, profile: Express.User) {
    return profile
  }
}
