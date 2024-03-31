import { Module } from '@nestjs/common'
import { AppController } from '@/app.controller'
import { AppService } from '@/app.service'
import { ConfigModule } from '@nestjs/config'
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core'
import { AllExceptionsFilter } from '@/filter/all-exception.filter'
import { TransformInterceptor } from '@/interceptor/transform.interceptor'
import { SequelizeModule } from '@nestjs/sequelize'
import { AuthModule } from '@/module/auth/auth.module'
import { UserModule } from '@/module/user/user.module'
import { TagModule } from '@/module/tag/tag.module'
import { ArticleModule } from '@/module/article/article.module'
import { CategoryModule } from '@/module/category/category.module'

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
    UserModule,
    TagModule,
    ArticleModule,
    CategoryModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    // 异常过滤器
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter
    },
    // 全局拦截器
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor
    }
  ]
})
export class AppModule {}
