import { IsDefined, IsNotEmpty } from 'class-validator'

export class FindOneDto {
  @IsDefined()
  @IsNotEmpty()
  id: number
}
