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
// import { PrismaService } from '../prisma.service'
import { ba_admin, Prisma } from '@prisma/client'
import { PrismaService } from 'nestjs-prisma'

@Injectable()
export class PostService {
  constructor(private prisma: PrismaService) {}

  async post(ba_adminWhereUniqueInput: Prisma.ba_adminWhereUniqueInput): Promise<ba_admin | null> {
    return this.prisma.ba_admin.findUnique({
      where: ba_adminWhereUniqueInput
    })
  }

  async posts(params: {
    skip?: number
    take?: number
    cursor?: Prisma.ba_adminWhereUniqueInput
    where?: Prisma.ba_adminWhereInput
    orderBy?: Prisma.ba_adminOrderByWithRelationInput
  }): Promise<ba_admin[]> {
    const { skip, take, cursor, where, orderBy } = params
    return this.prisma.ba_admin.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy
    })
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
