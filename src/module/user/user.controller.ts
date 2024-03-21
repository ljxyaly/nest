import { Controller, Get, Post, Body, Patch, Param, Delete, Version, UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

import { JwtAuthGuard } from '@/module/auth/jwt-auth.guard'
import { AuthService } from '@/module/auth/auth.service'
import { LocalAuthGuard } from '@/module/auth/local-auth.guard'
import { LoginUserDto } from './dto/login-user.dto'
import { FindOneDto } from '@/dto/findOne'
import { FindAllDto } from '@/dto/findAll'
import dayjs from 'dayjs'

@Controller({ path: 'user', version: '1' })
export class UserController {
  constructor(private readonly userService: UserService, private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async userLogin(@Body() body: LoginUserDto) {
    return this.authService.login(body)
  }

  @UseGuards(JwtAuthGuard)
  @Post('user_info')
  async getUserInfo(@Body() body: FindOneDto) {
    return await this.userService.findOne(body.id)
  }

  @Post('list')
  async getUserList(@Body() body: FindAllDto) {
    return await this.userService.findAll(body)
  }

  @Post('register')
  async userRegister(@Body() body: CreateUserDto) {
    return await this.userService.create(body)
    // return await this.userService.create(Object.assign(body, { created_at: dayjs().unix() }))
  }

  // @UseGuards(JwtAuthGuard)
  // @Get('profile')
  // getProfile() {
  //   return { res: '登录通过' }
  // }

  // // @Version('1')
  // @Post()
  // createV1(@Body() createUserDto: CreateUserDto) {
  //   // return this.userService.create(createUserDto);
  //   // return 'This action adds a new cat';
  //   return '版本1'
  // }

  // @Version('2')
  // @Post()
  // createV2(@Body() createUserDto: CreateUserDto) {
  //   // return this.userService.create(createUserDto);
  //   // return 'This action adds a new cat';
  //   return '版本2'
  // }

  // @Get()
  // findAll() {
  //   return this.userService.findAll()
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id)
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto)
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id)
  // }
}
