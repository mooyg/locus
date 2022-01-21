import { Controller, Get, NotFoundException, Req, Res, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { Request, Response } from 'express'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}
  @Get('/me')
  @UseGuards(AuthGuard('jwt'))
  async me() {
    return 'boo'
  }
  @Get('/login')
  @UseGuards(AuthGuard('github'))
  async login() {}

  @Get('callback')
  @UseGuards(AuthGuard('github'))
  async callBack(
    @Req()
    req: Request,
    @Res() res: Response
  ) {
    if (!req.user) {
      throw new NotFoundException('No user found')
    }
    const { accessToken } = await this._authService.githubLogin(req.user)

    const params = new URLSearchParams({ accessToken })

    res.redirect(`http://localhost:3000?${params.toString()}`)
  }
}
