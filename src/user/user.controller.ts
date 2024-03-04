import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Version,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller({ path: 'user', version: '1' })
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Version('1')
  @Post()
  createV1(@Body() createUserDto: CreateUserDto) {
    // return this.userService.create(createUserDto);
    // return 'This action adds a new cat';
    return '版本1';
  }

  @Version('2')
  @Post()
  createV2(@Body() createUserDto: CreateUserDto) {
    // return this.userService.create(createUserDto);
    // return 'This action adds a new cat';
    return '版本2';
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
