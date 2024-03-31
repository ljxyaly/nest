import { Column, DataType, Model, Table, CreatedAt, UpdatedAt, DeletedAt } from 'sequelize-typescript'

@Table({ tableName: 'bl_category', underscored: false })
export class CategoryModel extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number

  @Column({ type: DataType.STRING(50), unique: true, allowNull: false, comment: '分类名' })
  name: number

  @Column({ type: DataType.INTEGER, comment: '父级ID' })
  parent_id: number

  @Column({ type: DataType.STRING(255), comment: '分类备注' })
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
