// import { Controller, Get, Request, Post, UseGuards, Body } from '@nestjs/common'
// import { AppService } from './app.service'
// import { AuthGuard } from '@nestjs/passport'

// @Controller({ path: '/', version: '1' })
// export class AppController {
//   constructor(private readonly appService: AppService) {}
//   @Get()
//   getHello(): string {
//     return this.appService.getHello()
//   }
// }

import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common'
import { JwtAuthGuard } from './auth/jwt-auth.guard'
import { AuthService } from './auth/auth.service'
import { LocalAuthGuard } from './auth/local-auth.guard'

@Controller()
export class AppController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login({ username: 'john', password: 'changeme' })
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile() { return { a: '11' }}
}
