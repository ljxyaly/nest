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

import { Injectable, Inject, NotFoundException, HttpException } from '@nestjs/common'
import { user, Prisma } from '@prisma/client'
import { CustomPrismaService } from 'nestjs-prisma'
import { type ExtendedPrismaClient } from '@/prisma/prisma.extension'
import { ErrorCode } from '@/constant/error.constant'
import { UserDao } from './user.dao'
import dayjs from 'dayjs'

export type User = any

@Injectable()
export class UserService {
  constructor(
    @Inject('PrismaService')
    private prismaService: CustomPrismaService<ExtendedPrismaClient>,
    private readonly userDao: UserDao
  ) {}

  async create(data: Prisma.userCreateInput): Promise<user | unknown> {
    const res = await this.userDao.create(data)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...returnData } = res
    return returnData

    // const { username } = data
    // const user = await this.prismaService.client.user.findUnique({
    //   where: {
    //     username
    //   },
    //   select: {
    //     id: true,
    //     username: true,
    //     email: true
    //   }
    // })
    // if (user) {
    //   return ErrorCode[990001]
    // } else {
    //   console.log(data)
    //   try {
    //     const res = await this.prismaService.client.user.create({ data, select: { id: true, username: true, email: true } })
    //   } catch (error) {
    //     console.log(error)
    //     return ErrorCode[990002]
    //   }

    //   // return {
    //   //   data: res
    //   // }
    // }
  }

  // : Prisma.userUpdateInput
  async update(data) {
    return this.userDao.update(data)
  }

  async findAll(data) {
    return this.userDao.findAll(data)
  }

  async getUserInfo(data) {
    return this.userDao.findOne(data)
  }

  async findOne(body) {
    return this.prismaService.client.user.findUniqueOrThrow({
      where: {
        id: body.id
      }
      // select: {
      //   id: true,
      //   username: true,
      //   email: true
      // }
    })
    // const user = await this.prismaService.client.user.findUnique({
    //   where: {
    //     id
    //   },
    //   select: {
    //     id: true,
    //     username: true,
    //     email: true
    //   }
    // })
    // if (!user) {
    //   return ErrorCode[990002]
    // } else {
    //   return {
    //     data: user
    //   }
    // }
  }
  async authFindOne(username: string): Promise<User | undefined> {
    return await this.prismaService.client.user.findUnique({
      where: {
        username
      }
    })
  }
}
