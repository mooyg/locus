import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { User } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'
@Injectable()
export class AuthService {
  constructor(
    private readonly _prismaService: PrismaService,
    private readonly _jwtService: JwtService
  ) {}
  async githubLogin(user: Express.User) {
    const userExists = await this._prismaService.user.findFirst({
      where: {
        username: user.username,
      },
    })
    if (userExists) {
      return this.createJwt(user)
    } else {
      const createdUser = await this._prismaService.user.create({
        data: {
          avatarUrl: user.avatarUrl,
          username: user.username,
        },
      })
      return this.createJwt(createdUser)
    }
  }
  private createJwt({ id }: Partial<User>) {
    return {
      accessToken: this._jwtService.sign({
        id,
      }),
    }
  }
}
