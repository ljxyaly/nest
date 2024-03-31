import { Column, DataType, Model, Table, CreatedAt, UpdatedAt, DeletedAt } from 'sequelize-typescript'

@Table({ tableName: 'bl_article', underscored: false })
export class ArticleModel extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number

  @Column({ type: DataType.INTEGER, comment: '文章分类' })
  category_id: number

  @Column({ type: DataType.JSON, comment: '文章分类' })
  tag_id: Array<number>

  @Column({ type: DataType.STRING(50), allowNull: false, comment: '文章名称' })
  title: string

  @Column({ type: DataType.TEXT, comment: '文章内容' })
  content: string

  @Column({ type: DataType.STRING(255), comment: '文章备注' })
  remark: string

  @CreatedAt
  @Column
  created_at: Date

  @UpdatedAt
  @Column
  updated_at: Date

  @DeletedAt
  @Column
  deleted_at: Date
}
