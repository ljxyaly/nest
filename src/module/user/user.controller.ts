import { Controller, Post, Body, UseGuards, Request } from '@nestjs/common'
import { UserService } from './user.service'
import { JwtAuthGuard } from '@/module/auth/jwt-auth.guard'
import { AuthService } from '@/module/auth/auth.service'
import { LocalAuthGuard } from '@/module/auth/local-auth.guard'
import { LoginUserDto, CreateUserDto, GetUserInfoDto, GetUserListDto, UpdateUserDto } from './user.dto'
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger'

@ApiTags('用户')
@Controller({ path: 'user', version: '1' })
export class UserController {
  constructor(private readonly userService: UserService, private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async userLogin(@Body() body: LoginUserDto) {
    return this.authService.login(body)
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('user_info')
  // async getUserInfo(@Body() body: GetUserInfoDto) {
  //   return await this.userService.findOne(body)
  // }
  async getUserInfo(@Request() req: any) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    // const { iat, exp, ...user } = req.user
    // return user
    return await this.userService.getUserInfo({ id: req.user.id })
  }

  @Post('list')
  async getUserList(@Body() body: GetUserListDto) {
    return await this.userService.findAll(body)
  }

  @Post('register')
  async userRegister(@Body() body: CreateUserDto) {
    return await this.userService.create(body)
  }

  // @Version('2')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('edit')
  async update(@Body() body: UpdateUserDto) {
    return await this.userService.update(body)
  }
}
