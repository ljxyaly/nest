import { Injectable, Inject } from '@nestjs/common'
// import { odr_member, Prisma } from '@prisma/client'
import { CustomPrismaService } from 'nestjs-prisma'
import { type ExtendedPrismaClient } from '@/common/prisma/prisma.extension'

@Injectable()
export class PostService {
  constructor(
    @Inject('PrismaService')
    private prismaService: CustomPrismaService<ExtendedPrismaClient>
  ) {}

  // async findOne(odr_memberWhereUniqueInput: Prisma.odr_memberWhereUniqueInput): Promise<odr_member | null> {
  //   return this.prismaService.client.odr_member.findUnique({
  //     where: odr_memberWhereUniqueInput
  //   })
  // }

  // async findAll(params: { page?: number; limit?: number }): Promise<unknown> {
  //   // odr_member[]
  //   const { page, limit } = params
  //   const [list, meta] = await this.prismaService.client.odr_member.paginate().withPages({
  //     page,
  //     limit,
  //     includePageCount: true
  //   })
  //   return {
  //     list,
  //     total: meta.totalCount,
  //     page,
  //     limit
  //   }
  // }

  // async createPost(data: Prisma.PostCreateInput): Promise<Post> {
  //   return this.prisma.post.create({
  //     data
  //   })
  // }

  // async updatePost(params: { where: Prisma.PostWhereUniqueInput; data: Prisma.PostUpdateInput }): Promise<Post> {
  //   const { data, where } = params
  //   return this.prisma.post.update({
  //     data,
  //     where
  //   })
  // }

  // async deletePost(where: Prisma.PostWhereUniqueInput): Promise<Post> {
  //   return this.prisma.post.delete({
  //     where
  //   })
  // }
}
