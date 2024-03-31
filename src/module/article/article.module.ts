import { Module } from '@nestjs/common'
import { ArticleService } from './article.service'
import { ArticleController } from './article.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { ArticleModel } from './article.model'

@Module({
  imports: [SequelizeModule.forFeature([ArticleModel])],
  controllers: [ArticleController],
  providers: [ArticleService]
})
export class ArticleModule {}
