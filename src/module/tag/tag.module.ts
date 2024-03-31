import { Module } from '@nestjs/common'
import { TagService } from './tag.service'
import { TagController } from './tag.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { TagModel } from './tag.model'

@Module({
  imports: [SequelizeModule.forFeature([TagModel])],
  controllers: [TagController],
  providers: [TagService]
})
export class TagModule {}
