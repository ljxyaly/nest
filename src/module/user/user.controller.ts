import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common'
import { UserService } from './user.service'
import { JwtAuthGuard } from '@/module/auth/jwt-auth.guard'
import { AuthService } from '@/module/auth/auth.service'
import { LocalAuthGuard } from '@/module/auth/local-auth.guard'
import { UserLoginDto, UserCreateDto, UserListDto, UserUpdateDto } from './user.dto'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'

@ApiTags('用户')
@Controller({ path: 'user', version: '1' })
export class UserController {
  constructor(private readonly userService: UserService, private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() body: UserLoginDto) {
    return this.authService.login(body)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('detail')
  async detail(@Request() req: any) {
    console.log(req.user)
    return await this.userService.findOne({ id: req.user.id })
  }

  @Post('list')
  async list(@Body() body: UserListDto) {
    return this.userService.findAll(body)
  }

  @Post('register')
  async register(@Body() body: UserCreateDto) {
    return await this.userService.create(body)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('update')
  async update(@Body() body: UserUpdateDto) {
    return await this.userService.update(body)
  }
}
