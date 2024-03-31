import { IsNotEmpty, IsNumber } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { PartialType } from '@nestjs/mapped-types'

export class ArticleCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string

  @ApiProperty()
  alias: string

  @ApiProperty()
  remark: string
}

export class ArticleListDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  page: number

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  limit: number
}
export class ArticleDetailDto {
  @ApiProperty()
  @IsNotEmpty()
  id: number
}

export class ArticleUpdateDto extends PartialType(ArticleCreateDto) {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id: number
}

export class ArticleRemoveDto {
  @ApiProperty()
  @IsNotEmpty()
  id: number
}
