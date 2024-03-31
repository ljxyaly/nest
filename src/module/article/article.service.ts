import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { ArticleModel } from './article.model'

@Injectable()
export class ArticleService {
  constructor(
    @InjectModel(ArticleModel)
    private articleModel: typeof ArticleModel
  ) {}
  async create(data) {
    return this.articleModel.create(data)
  }

  async findAll(data) {
    const { page, limit } = data
    const { count, rows } = await this.articleModel.findAndCountAll({
      offset: (page - 1) * limit,
      limit
    })
    return {
      list: rows,
      total: count,
      page,
      limit
    }
  }

  async findOne(data) {
    const { id } = data
    return this.articleModel.findOne({
      where: {
        id
      }
    })
  }

  async update(data) {
    const { id, ..._data } = data
    return this.articleModel.update(_data, { where: { id } })
  }

  async delete(data) {
    const { id } = data
    return this.articleModel.destroy({
      where: {
        id
      }
    })
  }
}
