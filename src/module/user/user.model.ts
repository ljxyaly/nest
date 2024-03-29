import { Column, Model, Table, CreatedAt, UpdatedAt, DeletedAt } from 'sequelize-typescript'

@Table({ tableName: 'user', underscored: false })
export class UserModel extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number

  @Column({ defaultValue: '', unique: true })
  username: string

  @Column
  email: string

  @Column
  password: string

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
