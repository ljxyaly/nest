import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common'
import { JwtAuthGuard } from '@/auth/jwt-auth.guard'
import { AuthService } from '@/auth/auth.service'
import { LocalAuthGuard } from '@/auth/local-auth.guard'

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  // @UseGuards(LocalAuthGuard)
  // @Post('auth/login')
  // async login(@Request() req) {
  //   return this.authService.login({ username: 'john', password: 'changeme' })
  // }

  // @UseGuards(JwtAuthGuard)
  // @Get('profile')
  // getProfile() {
  //   return { res: '登录通过' }
  // }
}
