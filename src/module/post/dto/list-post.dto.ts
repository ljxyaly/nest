import { IsNotEmpty, IsDefined, IsNumber, IsInt, IsNegative, IsPositive } from 'class-validator'

// create-user.dto.ts
export class ListPostDto {
  @IsDefined()
  @IsNotEmpty()
  @IsPositive()
  page: number

  @IsDefined()
  @IsNotEmpty()
  @IsPositive()
  limit: number
}
