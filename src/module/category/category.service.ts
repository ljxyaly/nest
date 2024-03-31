import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { CategoryModel } from './category.model'

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(CategoryModel)
    private categoryModel: typeof CategoryModel
  ) {}
  async create(data) {
    return this.categoryModel.create(data)
  }

  async findAll(data) {
    const { page, limit } = data
    const { count, rows } = await this.categoryModel.findAndCountAll({
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
    return this.categoryModel.findOne({
      where: {
        id
      }
    })
  }

  async update(data) {
    const { id, ..._data } = data
    return this.categoryModel.update(_data, { where: { id } })
  }

  async delete(data) {
    const { id } = data
    return this.categoryModel.destroy({
      where: {
        id
      }
    })
  }
}
