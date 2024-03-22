import { Injectable, Inject } from '@nestjs/common'
import { user, Prisma } from '@prisma/client'
import { CustomPrismaService } from 'nestjs-prisma'
import { type ExtendedPrismaClient } from '@/prisma/prisma.extension'
import { ErrorCode } from '@/constant/error.constant'
import dayjs from 'dayjs'
import * as bcrypt from 'bcrypt'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class UserDao {
  constructor(
    @Inject('PrismaService')
    private prismaService: CustomPrismaService<ExtendedPrismaClient>,
    private configService: ConfigService
  ) {}

  async create(data) {
    const bcrypt_password = await bcrypt.hash(data.password, Number(this.configService.get('BCRYPT_HASH_ROUNDS')))
    return this.prismaService.client.user.create({
      data: { ...data, created_at: dayjs().unix(), password: bcrypt_password }
    })
  }

  async update(data) {
    const { id, ..._data } = data
    return this.prismaService.client.user.update({
      where: {
        id
      },
      data: { ..._data, updated_at: dayjs().unix() }
    })
  }

  async findAll(data) {
    const { page, limit, username, email, id } = data
    const [list, meta] = await this.prismaService.client.user
      .paginate({
        where: {
          id: {
            equals: id
          },
          username: {
            contains: username
          },
          email: {
            contains: email
          }
        },
        select: {
          id: true,
          username: true,
          email: true,
          created_at: true,
          updated_at: true
        }
      })
      .withPages({
        page,
        limit
      })
    return {
      list,
      total: meta.totalCount,
      page,
      limit
    }
  }

  async findOne(data) {
    const { id } = data
    return this.prismaService.client.user.findUniqueOrThrow({
      where: {
        id
      },
      select: {
        id: true,
        username: true,
        email: true,
        // password: true,
        created_at: true,
        updated_at: true
      }
    })
  }

  // updateTestDto: UpdateTestDto
  // update(id: number) {
  //   return `This action updates a #${id} test`
  // }

  remove(data) {
    const { id } = data
    return this.prismaService.client.user.update({
      where: {
        id
      },
      data: {
        // is_deleted: 1
      }
    })
  }
}
