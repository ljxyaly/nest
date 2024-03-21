import { Injectable, Inject } from '@nestjs/common'
import { user, Prisma } from '@prisma/client'
import { CustomPrismaService } from 'nestjs-prisma'
import { type ExtendedPrismaClient } from '@/prisma/prisma.extension'
import { ErrorCode } from '@/constant/error.constant'
import dayjs from 'dayjs'

@Injectable()
export class UserDao {
  constructor(
    @Inject('PrismaService')
    private prismaService: CustomPrismaService<ExtendedPrismaClient>
  ) {}
  // createTestDto: CreateTestDto
  async create(data) {
    return this.prismaService.client.user.create({ data: { ...data, created_at: dayjs().unix() } })
  }

  async findAll(data) {
    return this.prismaService.client.user.findMany({
      where: {}
    })
  }

  findOne(id: number) {
    return `This action returns a #${id} test`
  }

  // updateTestDto: UpdateTestDto
  update(id: number) {
    return `This action updates a #${id} test`
  }

  remove(id: number) {
    return `This action removes a #${id} test`
  }

  // async create(data: Prisma.userCreateInput): Promise<user | unknown> {
  //   const { username } = data
  //   const user = await this.prismaService.client.user.findUnique({
  //     where: {
  //       username
  //     },
  //     select: {
  //       id: true,
  //       username: true,
  //       email: true
  //     }
  //   })
  //   if (user) {
  //     return ErrorCode[990001]
  //   } else {
  //     console.log(data)
  //     try {
  //       const res = await this.prismaService.client.user.create({ data, select: { id: true, username: true, email: true } })
  //     } catch (error) {
  //       console.log(error)
  //       return ErrorCode[990002]
  //     }

  //     // return {
  //     //   data: res
  //     // }
  //   }
  // }

  // async findOne(id) {
  //   const user = await this.prismaService.client.user.findUnique({
  //     where: {
  //       id
  //     },
  //     select: {
  //       id: true,
  //       username: true,
  //       email: true
  //     }
  //   })
  //   if (!user) {
  //     return ErrorCode[990002]
  //   } else {
  //     return {
  //       data: user
  //     }
  //   }
  // }
  // async authFindOne(username: string): Promise<User | undefined> {
  //   return await this.prismaService.client.user.findUnique({
  //     where: {
  //       username
  //     }
  //   })
  // }
}
