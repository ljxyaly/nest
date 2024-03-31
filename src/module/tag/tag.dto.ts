import { IsNotEmpty, IsNumber } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { PartialType } from '@nestjs/mapped-types'

export class TagCreateDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string

  @ApiProperty()
  alias: string

  @ApiProperty()
  remark: string
}

export class TagListDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  page: number

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  limit: number
}
export class TagDetailDto {
  @ApiProperty()
  @IsNotEmpty()
  id: number
}

export class TagUpdateDto extends PartialType(TagCreateDto) {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id: number
}

export class TagRemoveDto {
  @ApiProperty()
  @IsNotEmpty()
  id: number
}
