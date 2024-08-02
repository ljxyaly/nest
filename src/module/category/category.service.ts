import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { CategoryModel } from './category.model'
import { ErrorException } from '@/filter/error-exception.filter'
import { ErrorCode } from '@/filter/error-code'
// import axios from 'axios'

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(CategoryModel)
    private categoryModel: typeof CategoryModel
  ) {}
  async create(data) {
    const { parent_id = 0, name } = data
    if (parent_id !== 0) {
      const parent = await this.categoryModel.findOne({
        where: {
          id: parent_id
        }
      })
      if (!parent) {
        throw new ErrorException(ErrorCode[991003])
      }
    }

    const findOne = await this.categoryModel.findOne({
      where: {
        name
      }
    })
    if (findOne) {
      throw new ErrorException(ErrorCode[991002])
    }

    return this.categoryModel.create(data)
  }

  async findAll(data) {
    const { page, limit } = data
    const { count, rows } = await this.categoryModel.findAndCountAll({
      offset: (page - 1) * limit,
      limit
    })

    // const res =  await axios.post('https://who.cx/whois', {
    //   domain: 'google.com'
    // });
    // return {
    //   list: res.data
    // }
    // console.log(res.data.data)
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

    const findOne = await this.findOne(data)
    if (!findOne) {
      throw new ErrorException(ErrorCode[991001])
    }
    return this.categoryModel.update(_data, { where: { id } })
  }

  async delete(data) {
    const { id } = data

    const findOne = await this.categoryModel.findOne({
      where: {
        id
      },
      paranoid: false
    })
    if (!findOne) {
      throw new ErrorException(ErrorCode[991001])
    }

    return this.categoryModel.destroy({
      where: {
        id
      },
      force: true
    })
  }
}
