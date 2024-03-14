// import { Injectable } from '@nestjs/common'
// import { CreatePostDto } from './dto/create-post.dto'
// import { UpdatePostDto } from './dto/update-post.dto'

// @Injectable()
// export class PostService {
//   create(createPostDto: CreatePostDto) {
//     return 'This action adds a new post'
//   }

//   findAll() {
//     return `This action returns all post`
//   }

//   findOne(id: number) {
//     return `This action returns a #${id} post`
//   }

//   update(id: number, updatePostDto: UpdatePostDto) {
//     return `This action updates a #${id} post`
//   }

//   remove(id: number) {
//     return `This action removes a #${id} post`
//   }
// }

import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'
import { odr_member, Prisma } from '@prisma/client'
// import { PrismaService } from 'nestjs-prisma'

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}
  // constructor(private prisma) {}

  async findOne(odr_memberWhereUniqueInput: Prisma.odr_memberWhereUniqueInput): Promise<odr_member | null> {
    return this.prisma.odr_member.findUnique({
      where: odr_memberWhereUniqueInput
    })
  }

  async findAll(params: {
    skip?: number
    take?: number
    cursor?: Prisma.odr_memberWhereUniqueInput
    where?: Prisma.odr_memberWhereInput
    orderBy?: Prisma.odr_memberOrderByWithRelationInput
  }): Promise<odr_member[]> {
    const { skip, take, cursor, where, orderBy } = params
    return this.prisma.prismaExtended.odr_member.paginate().withPages({
      limit: 10,
      page: 2
    })
    // .findMany({
    //   skip,
    //   take
    //   // cursor,
    //   // where,
    //   // orderBy
    // })
  }

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
