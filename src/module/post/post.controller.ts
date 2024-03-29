import { Controller, Get, Req, Post, Body, Patch, Param, Delete, Version, Query, UseInterceptors, ParseIntPipe, UseGuards } from '@nestjs/common'
import { PostService } from './post.service'
// import { CreatePostDto } from './dto/create-post.dto'
import { DetailPostDto } from './dto/detail-post.dto'
import { ListPostDto } from './dto/list-post.dto'
// import { UpdatePostDto } from './dto/update-post.dto'
// import { Post as PostModel } from '@prisma/client'

@Controller({ path: 'post', version: '1' })
export class PostController {
  // , private authService: AuthService
  constructor(private readonly postService: PostService) {}

  // @Post()
  // create(@Body() createPostDto: CreatePostDto) {
  //   return this.postService.create(createPostDto)
  // }

  @Post('list')
  findAll(@Body() body: ListPostDto) {
    // return this.postService.findAll(body)
    return null
  }

  @Post('detail')
  findOne(@Body() body: DetailPostDto): Promise<unknown> {
    // return this.postService.findOne(body)
    return null
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
  //   return this.postService.update(+id, updatePostDto)
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.postService.remove(+id)
  // }
}
