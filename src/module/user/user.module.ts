import { Module, forwardRef } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { AuthModule } from '@/module/auth/auth.module'
import { SequelizeModule } from '@nestjs/sequelize'
import { UserModel } from './user.model'

@Module({
  imports: [forwardRef(() => AuthModule), SequelizeModule.forFeature([UserModel])],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
