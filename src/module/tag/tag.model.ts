import { Column, DataType, Model, Table, CreatedAt, UpdatedAt, DeletedAt } from 'sequelize-typescript'

@Table({ tableName: 'bl_tag', underscored: false })
export class TagModel extends Model {
  @Column({ type: DataType.INTEGER, primaryKey: true, autoIncrement: true })
  id: number

  @Column({ type: DataType.STRING(50), unique: true, allowNull: false, comment: '标签名称' })
  name: string

  @Column({ type: DataType.STRING(50), comment: '标签别名' })
  alias: string

  @Column({ type: DataType.STRING(255), comment: '标签备注' })
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
