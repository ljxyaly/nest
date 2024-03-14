import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UserService {
  // @InjectRepository(User) private userRepository: Repository<User>
  async create(createUserDto: CreateUserDto) {
    createUserDto.createTime = createUserDto.updateTime = new Date()
    // return await this.userRepository.save(createUserDto)
    return 'create'
  }

  async findAll() {
    // return await this.userRepository.find()
    return 'findAll'
  }

  async findOne(id: number) {
    // return this.userRepository.findBy({ id })
    return 'findOne'
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    // updateUserDto.updateTime = new Date()
    // return await this.userRepository.update(id, updateUserDto)
    return 'update'
  }

  async remove(id: number) {
    // return await this.userRepository.delete(id)
    return 'remove'
  }
}
