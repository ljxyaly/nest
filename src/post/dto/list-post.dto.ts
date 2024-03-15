import { IsNotEmpty, IsDefined, IsNumber, IsInt, IsNegative, IsPositive } from 'class-validator'

// create-user.dto.ts
export class ListPostDto {
  // @IsDefined({ message: '必填' })
  // // @IsNotEmpty()
  // @IsPositive({ message: '必须为正整数' })
  page: number

  @IsDefined()
  @IsNotEmpty()
  limit: number
}
