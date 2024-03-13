import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { PostService } from './post.service'
// import { CreatePostDto } from './dto/create-post.dto'
// import { UpdatePostDto } from './dto/update-post.dto'
// import { Post as PostModel } from '@prisma/client'

@Controller({ path: 'post', version: '1' })
export class PostController {
  constructor(private readonly postService: PostService) {}

  // @Post()
  // create(@Body() createPostDto: CreatePostDto) {
  //   return this.postService.create(createPostDto)
  // }

  // @Get()
  // findAll() {
  //   return this.postService.findAll()
  // }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<unknown> {
    return this.postService.post({ id: Number(id) })
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
