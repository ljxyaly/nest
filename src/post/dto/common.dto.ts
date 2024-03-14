import { IsNotEmpty, IsDefined, Length } from 'class-validator'

// create-user.dto.ts
export class CommonPostDto {
  @IsDefined()
  @IsNotEmpty()
  id: number
}
