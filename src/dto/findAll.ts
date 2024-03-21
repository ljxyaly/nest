import { IsDefined, IsNotEmpty } from 'class-validator'

export class FindAllDto {
  @IsDefined()
  @IsNotEmpty()
  page: number

  @IsDefined()
  @IsNotEmpty()
  limit: number
}
