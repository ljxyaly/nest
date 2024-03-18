import { HttpStatus, Module } from '@nestjs/common'
import { AppController } from '@/app.controller'
import { AppService } from '@/app.service'
import { ConfigModule } from '@nestjs/config'
// import { PostModule } from '@/post/post.module'
import { AuthModule } from '@/auth/auth.module'
import { UserModule } from '@/user/user.module'
import { CustomPrismaModule } from 'nestjs-prisma'
import { extendedPrismaClient } from '@/common/prisma/prisma.extension'
import { providePrismaClientExceptionFilter } from 'nestjs-prisma'
import { APP_FILTER } from '@nestjs/core'
import { AllExceptionsFilter } from '@/common/filters/all-exception.filter'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    CustomPrismaModule.forRootAsync({
      name: 'PrismaService',
      isGlobal: true,
      useFactory: () => {
        return extendedPrismaClient
      }
    }),
    AuthModule,
    UserModule
    // PostModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter
    },
    providePrismaClientExceptionFilter({
      P2000: HttpStatus.BAD_REQUEST,
      P2002: HttpStatus.CONFLICT,
      P2025: HttpStatus.NOT_FOUND
    })
  ]
})
export class AppModule {}
