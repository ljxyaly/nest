import { IsNotEmpty, Length } from 'class-validator'

// create-user.dto.ts
export class CreateUserDto {
  // @IsNotEmpty()
  name: string

  // @Length(10, 20, { message: '密码长度必须在10到20之间' })
  sex: string

  createTime: Date

  updateTime: Date
}
