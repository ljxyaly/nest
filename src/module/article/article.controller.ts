import { Controller, Post, Body } from '@nestjs/common'
import { ArticleService } from './article.service'
import { ArticleCreateDto, ArticleListDto, ArticleDetailDto, ArticleUpdateDto, ArticleRemoveDto } from './article.dto'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('文章')
@Controller({ path: 'article', version: '1' })
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post('create')
  create(@Body() body: ArticleCreateDto) {
    return this.articleService.create(body)
  }

  @Post('list')
  findAll(@Body() body: ArticleListDto) {
    return this.articleService.findAll(body)
  }

  @Post('detail')
  findOne(@Body() body: ArticleDetailDto) {
    return this.articleService.findOne(body)
  }

  @Post('update')
  update(@Body() body: ArticleUpdateDto) {
    return this.articleService.update(body)
  }

  @Post('delete')
  delete(@Body() body: ArticleRemoveDto) {
    return this.articleService.delete(body)
  }
}
