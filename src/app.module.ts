import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { ConfigModule } from '@nestjs/config'
import { PostModule } from './post/post.module'
// import { PrismaModule } from 'nestjs-prisma'
import { AuthModule } from './auth/auth.module'
import { UsersModule } from './users/users.module'
// import { CustomPrismaModule } from 'nestjs-prisma';
// import { PrismaClient } from '@prisma/client';
// import { pagination } from "prisma-extension-pagination";
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    // CustomPrismaModule.forRootAsync({
    //   name: 'PrismaService',
    //   isGlobal: true,
    //   useFactory: () => {
    //     return new PrismaClient().$extends(pagination())
    //   },
    // }),
    // PrismaModule.forRoot({
    //   isGlobal: true
    // }),
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true
    }),
    UserModule,
    PostModule,
    AuthModule,
    UsersModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
