import { IsNotEmpty, IsPositive, IsInt } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { PartialType } from '@nestjs/mapped-types'

export class CategoryCreateDto {
  @ApiProperty({ description: '分类名称', default: '分类名称' })
  @IsNotEmpty()
  name: string

  @ApiProperty({ description: '父级ID', default: 0 })
  @IsInt()
  parent_id: number

  @ApiProperty({ description: '备注', default: '' })
  remark: string
}

export class CategoryListDto {
  @ApiProperty({ description: '页码', default: 1 })
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  page: number

  @ApiProperty({ description: '页数', default: 20 })
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  limit: number
}
export class CategoryDetailDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  id: number
}

export class CategoryUpdateDto extends PartialType(CategoryCreateDto) {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  id: number
}

export class CategoryRemoveDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  id: number
}
