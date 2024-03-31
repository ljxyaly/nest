// import { Injectable } from '@nestjs/common'
// import { CreateUserDto } from './dto/create-user.dto'
// import { UpdateUserDto } from './dto/update-user.dto'
// import { User } from './entities/user.entity'

// @Injectable()
// export class UserService {
//   // @InjectRepository(User) private userRepository: Repository<User>
//   async create(createUserDto: CreateUserDto) {
//     createUserDto.createTime = createUserDto.updateTime = new Date()
//     // return await this.userRepository.save(createUserDto)
//     return 'create'
//   }

//   async findAll() {
//     // return await this.userRepository.find()
//     return 'findAll'
//   }

//   async findOne(id: number) {
//     // return this.userRepository.findBy({ id })
//     return 'findOne'
//   }

//   async update(id: number, updateUserDto: UpdateUserDto) {
//     // updateUserDto.updateTime = new Date()
//     // return await this.userRepository.update(id, updateUserDto)
//     return 'update'
//   }

//   async remove(id: number) {
//     // return await this.userRepository.delete(id)
//     return 'remove'
//   }
// }

import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { UserModel } from './user.model'
import { ConfigService } from '@nestjs/config'
import * as bcrypt from 'bcrypt'

export type User = any

@Injectable()
export class UserService {
  constructor(
    @InjectModel(UserModel)
    private userModel: typeof UserModel,
    private configService: ConfigService
  ) {}
  async create(data) {
    const bcrypt_password = await bcrypt.hash(data.password, Number(this.configService.get('BCRYPT_HASH_ROUNDS')))
    return this.userModel.create({ ...data, password: bcrypt_password })
  }

  async update(data) {
    const { id, ..._data } = data
    return this.userModel.update(_data, { where: { id } })
  }

  async findAll(data) {
    const { page, limit } = data
    const { count, rows } = await this.userModel.findAndCountAll({
      offset: (page - 1) * limit,
      limit,
      attributes: {
        exclude: ['password']
      }
    })
    return {
      list: rows,
      total: count,
      page,
      limit
    }
  }

  async findOne(data) {
    const { id } = data
    return this.userModel.findOne({
      where: {
        id
      },
      attributes: {
        exclude: ['password']
      }
    })
  }

  async authFindOne(data) {
    const { username } = data
    return this.userModel.findOne({
      where: {
        username
      }
    })
  }
}
