import { IsDefined, IsEmail, IsNotEmpty, IsNumber, IsOptional, Length } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { PartialType } from '@nestjs/mapped-types'

export class CreateUserDto {
  @IsDefined()
  @IsNotEmpty()
  @Length(4, 20, { message: '用户名长度必须在4到20之间' })
  username: string

  @IsDefined()
  @IsNotEmpty()
  @Length(6, 20, { message: '密码长度必须在6到20之间' })
  password: string

  @IsEmail()
  @IsOptional()
  email: string

  created_at: number
  updated_at: number
}

export class GetUserListDto {
  @IsNotEmpty()
  @IsNumber()
  page: number

  @IsNotEmpty()
  @IsNumber()
  limit: number
}

export class LoginUserDto {
  @ApiProperty({
    description: '用户名',
    default: 'jx'
  })
  @IsNotEmpty()
  username: string

  @ApiProperty({
    description: '密码',
    default: '123456'
  })
  @IsNotEmpty()
  password: string
}

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id: number
}

export class GetUserInfoDto {
  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  id: number
}
