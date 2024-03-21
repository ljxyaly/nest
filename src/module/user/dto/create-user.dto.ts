import { IsDefined, IsEmail, IsNotEmpty, IsOptional, Length } from 'class-validator'

// create-user.dto.ts
export class CreateUserDto {
  @IsDefined()
  @IsNotEmpty()
  @Length(4, 20, { message: '用户名长度必须在4到20之间' })
  username: string

  @IsDefined()
  @IsNotEmpty()
  @Length(8, 20, { message: '密码长度必须在8到20之间' })
  password: string

  @IsEmail()
  @IsOptional()
  email?: string

  created_at?: number
  updated_at?: number
}
