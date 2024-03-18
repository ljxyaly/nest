import { IsNotEmpty, IsDefined } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'

export class LoginUserDto {
  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  username: string

  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  password: string
}
