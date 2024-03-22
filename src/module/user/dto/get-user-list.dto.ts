import { CreateUserDto } from './create-user.dto'
import { FindAllDto } from '@/dto/findAll'

export class GetUserListDto extends CreateUserDto {
  constructor() {
    super()
    Object.assign(this, FindAllDto)
  }
}
