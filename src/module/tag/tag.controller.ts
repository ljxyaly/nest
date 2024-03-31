import { Controller, Post, Body } from '@nestjs/common'
import { TagService } from './tag.service'
import { TagCreateDto, TagListDto, TagDetailDto, TagUpdateDto, TagRemoveDto } from './tag.dto'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('标签')
@Controller({ path: 'tag', version: '1' })
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Post('create')
  create(@Body() body: TagCreateDto) {
    return this.tagService.create(body)
  }

  @Post('list')
  findAll(@Body() body: TagListDto) {
    return this.tagService.findAll(body)
  }

  @Post('detail')
  findOne(@Body() body: TagDetailDto) {
    return this.tagService.findOne(body)
  }

  @Post('update')
  update(@Body() body: TagUpdateDto) {
    return this.tagService.update(body)
  }

  @Post('delete')
  delete(@Body() body: TagRemoveDto) {
    return this.tagService.delete(body)
  }
}
