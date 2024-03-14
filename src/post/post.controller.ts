import { Controller, Get, Req, Post, Body, Patch, Param, Delete, Version, Query } from '@nestjs/common'
import { PostService } from './post.service'
// import { CreatePostDto } from './dto/create-post.dto'
import { CommonPostDto } from './dto/common.dto'
// import { UpdatePostDto } from './dto/update-post.dto'
// import { Post as PostModel } from '@prisma/client'

@Controller({ path: 'post', version: '1' })
export class PostController {
  constructor(private readonly postService: PostService) {}

  // @Post()
  // create(@Body() createPostDto: CreatePostDto) {
  //   return this.postService.create(createPostDto)
  // }

  @Post('list')
  findAll(@Body() body) {
    return this.postService.findAll(body)
  }

  @Post('detail')
  findOne(@Body() body: CommonPostDto): Promise<unknown> {
    return this.postService.findOne(body)
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
