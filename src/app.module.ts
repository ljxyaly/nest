import { Module, ValidationPipe } from '@nestjs/common'
import { AppController } from '@/app.controller'
import { AppService } from '@/app.service'
import { ConfigModule } from '@nestjs/config'
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core'
import { AllExceptionsFilter } from '@/filter/all-exception.filter'
import { TransformInterceptor } from '@/interceptor/transform.interceptor'
import { SequelizeModule } from '@nestjs/sequelize'
import { ErrorException } from '@/filter/error-exception.filter'
import { ErrorCode } from '@/filter/error-code'
import * as _ from 'lodash'
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
    },
    // 全局参数校验 pipe
    {
      provide: APP_PIPE,
      useFactory: () =>
        new ValidationPipe({
          transform: true,
          exceptionFactory: (errors) =>
            new ErrorException(
              Object.assign({}, ErrorCode['990001'], {
                data: _.flatten(errors.filter((item) => !!item.constraints).map((item) => Object.values(item.constraints)))
              })
            )
        })
    }
  ]
})
export class AppModule {}
