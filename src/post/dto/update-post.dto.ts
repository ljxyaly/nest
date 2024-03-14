import { PartialType } from '@nestjs/swagger'
import { CreatePostDto } from './create-post.dto'

export class UpdateAbcDto extends PartialType(CreatePostDto) {}
