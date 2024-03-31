import { IsNotEmpty, IsNumber } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { PartialType } from '@nestjs/mapped-types'

export class CategoryCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string

  @ApiProperty()
  parent_id: number

  @ApiProperty()
  remark: string
}

export class CategoryListDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  page: number

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  limit: number
}
export class CategoryDetailDto {
  @ApiProperty()
  @IsNotEmpty()
  id: number
}

export class CategoryUpdateDto extends PartialType(CategoryCreateDto) {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id: number
}

export class CategoryRemoveDto {
  @ApiProperty()
  @IsNotEmpty()
  id: number
}
