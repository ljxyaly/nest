import { HttpStatus, Module } from '@nestjs/common'
import { AppController } from '@/app.controller'
import { AppService } from '@/app.service'
import { UserModule } from '@/user/user.module'
import { ConfigModule } from '@nestjs/config'
import { PostModule } from '@/post/post.module'
import { AuthModule } from '@/auth/auth.module'
import { UsersModule } from '@/users/users.module'
import { CustomPrismaModule } from 'nestjs-prisma'
import { extendedPrismaClient } from '@/common/prisma/prisma.extension'
import { providePrismaClientExceptionFilter } from 'nestjs-prisma'

@Module({
  imports: [
    ConfigModule,
    CustomPrismaModule.forRootAsync({
      name: 'PrismaService',
      isGlobal: true,
      useFactory: () => {
        return extendedPrismaClient
      }
    }),
    UserModule,
    PostModule,
    AuthModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    providePrismaClientExceptionFilter({
      P2000: HttpStatus.BAD_REQUEST,
      P2002: HttpStatus.CONFLICT,
      P2025: HttpStatus.NOT_FOUND
    })
  ]
})
export class AppModule {}
