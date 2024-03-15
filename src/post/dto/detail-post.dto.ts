import { IsNotEmpty, IsDefined, Length } from 'class-validator'

// create-user.dto.ts
export class DetailPostDto {
  @IsDefined()
  @IsNotEmpty()
  id: number
}
