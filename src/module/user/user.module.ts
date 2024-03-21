import { Module, forwardRef } from '@nestjs/common'
import { UserService } from './user.service'
import { UserDao } from './user.dao'
import { UserController } from './user.controller'
import { AuthModule } from '@/module/auth/auth.module'

@Module({
  imports: [forwardRef(() => AuthModule)],
  providers: [UserService, UserDao],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule {}
