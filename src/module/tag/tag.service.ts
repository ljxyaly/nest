import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { TagModel } from './tag.model'

@Injectable()
export class TagService {
  constructor(
    @InjectModel(TagModel)
    private tagModel: typeof TagModel
  ) {}
  async create(data) {
    return this.tagModel.create(data)
  }

  async findAll(data) {
    const { page, limit } = data
    const { count, rows } = await this.tagModel.findAndCountAll({
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
    return this.tagModel.findOne({
      where: {
        id
      }
    })
  }

  async update(data) {
    const { id, ..._data } = data
    return this.tagModel.update(_data, { where: { id } })
  }

  async delete(data) {
    const { id } = data
    return this.tagModel.destroy({
      where: {
        id
      }
    })
  }
}
