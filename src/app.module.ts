import { Module } from '@nestjs/common'
import { AppController } from '@/app.controller'
import { AppService } from '@/app.service'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from '@/module/auth/auth.module'
import { UserModule } from '@/module/user/user.module'
// import { APP_FILTER } from '@nestjs/core'
// import { AllExceptionsFilter } from '@/filter/all-exception.filter'
import { SequelizeModule } from '@nestjs/sequelize'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: '127.0.0.1',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      autoLoadModels: true,
      synchronize: true
    }),
    AuthModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [
    AppService
    // {
    //   provide: APP_FILTER,
    //   useClass: AllExceptionsFilter
    // }
  ]
})
export class AppModule {}
