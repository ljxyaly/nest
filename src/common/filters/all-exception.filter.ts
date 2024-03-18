// 这里需要在main.ts中进行全局注册
// import { AllExceptionsFilter } from '@/common/filters/all-exception.filter'
// app.useGlobalFilters(new AllExceptionsFilter())

// import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common'
// import { HttpException, HttpStatus } from '@nestjs/common'
// @Catch()
// export class AllExceptionsFilter implements ExceptionFilter {
//   catch(exception: unknown, host: ArgumentsHost) {
//     const ctx = host.switchToHttp()
//     const response = ctx.getResponse()
//     const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
//     const message = exception instanceof HttpException ? exception.getResponse()['message'] || 'fasle' : exception
//     response.status(status).json({
//       code: status,
//       message,
//       timestamp: new Date().getTime()
//     })
//   }
// }

// 这里需要在app.module.ts中进行全局注册
// import { APP_FILTER } from '@nestjs/core'
// import { AllExceptionsFilter } from '@/common/filters/all-exception.filter'
// providers: [ { provide: APP_FILTER, useClass: AllExceptionsFilter } ]

import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost
    const ctx = host.switchToHttp()
    const httpStatus = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR
    const message = exception instanceof HttpException ? exception.getResponse()['message'] || 'fasle' : exception
    const responseBody = {
      code: httpStatus,
      message,
      timestamp: new Date().getTime()
    }
    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus)
  }
}
