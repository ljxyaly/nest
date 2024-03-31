import { Controller, Post, Body } from '@nestjs/common'
import { CategoryService } from './category.service'
import { CategoryCreateDto, CategoryListDto, CategoryDetailDto, CategoryUpdateDto, CategoryRemoveDto } from './category.dto'
import { ApiTags } from '@nestjs/swagger'

@ApiTags('分类')
@Controller({ path: 'category', version: '1' })
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post('create')
  create(@Body() body: CategoryCreateDto) {
    return this.categoryService.create(body)
  }

  @Post('list')
  findAll(@Body() body: CategoryListDto) {
    return this.categoryService.findAll(body)
  }

  @Post('detail')
  findOne(@Body() body: CategoryDetailDto) {
    return this.categoryService.findOne(body)
  }

  @Post('update')
  update(@Body() body: CategoryUpdateDto) {
    return this.categoryService.update(body)
  }

  @Post('delete')
  delete(@Body() body: CategoryRemoveDto) {
    return this.categoryService.delete(body)
  }
}
