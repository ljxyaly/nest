// 这里需要在main.ts中进行全局注册
// import { AllExceptionsFilter } from '@/common/filters/all-exception.filter'
// app.useGlobalFilters(new AllExceptionsFilter())

// import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common'
// import { HttpException, HttpStatus } from '@nestjs/common'
// import dayjs from 'dayjs'
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
//       timestamp: dayjs().unix()
//     })
//   }
// }

// 这里需要在app.module.ts中进行全局注册
// import { APP_FILTER } from '@nestjs/core'
// import { AllExceptionsFilter } from '@/common/filters/all-exception.filter'
// providers: [ { provide: APP_FILTER, useClass: AllExceptionsFilter } ]

import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'
import dayjs from 'dayjs'
import { Prisma } from '@prisma/client'
import { Request, Response } from 'express'
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  catch(exception: unknown, host: ArgumentsHost): void {
    // const { httpAdapter } = this.httpAdapterHost
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR

    let data: any = {
      message: ''
    }

    if (exception instanceof HttpException) {
      if (exception.getResponse()['message']) {
        data = {
          message: Array.isArray(exception.getResponse()['message']) ? exception.getResponse()['message'][0] : exception.getResponse()['message']
        }
      } else {
        data = {
          message: `${status >= 500 ? 'Service Error' : 'Client Error'}`
        }
      }
    } else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      data = {
        message: 'PrismaClientKnownRequestError',
        detail: exception.message,
        clientVersion: exception.clientVersion,
        code: exception.code
      }
    } else if (exception instanceof Prisma.PrismaClientUnknownRequestError) {
      data = {
        message: 'PrismaClientUnknownRequestError',
        detail: exception.message,
        clientVersion: exception.clientVersion
      }
    } else if (exception instanceof Prisma.PrismaClientValidationError) {
      data = {
        message: 'PrismaClientValidationError',
        detail: exception.message,
        clientVersion: exception.clientVersion
      }
    } else {
      data = {
        message: exception.toString()
      }
    }

    const errorResponse = {
      statusCode: status,
      data: Object.assign(data, { requestBody: request.body }),
      message: '请求失败',
      code: 1,
      timestamp: dayjs().unix()
    }
    response.status(status)
    response.header('Content-Type', 'application/json; charset=utf-8')
    response.send(errorResponse)

    // const httpStatus = exception instanceof HttpException ? exception.getStatus() : 400
    // const message = exception instanceof HttpException ? exception.getResponse()['message']?.toString() || 'fasle' : exception.toString()

    // let httpStatus = HttpStatus.BAD_REQUEST
    // let message = 'fail'
    // let data = null

    // if (exception instanceof HttpException) {
    //   httpStatus = exception.getStatus()
    //   message = exception.getResponse()['message']
    // } else if (exception instanceof Prisma.PrismaClientKnownRequestError) {
    //   message = 'PrismaClientKnownRequestError'
    //   data = {
    //     message: exception.message,
    //     clientVersion: exception.clientVersion,
    //     code: exception.code
    //   }
    // } else if (exception instanceof Prisma.PrismaClientUnknownRequestError) {
    //   httpStatus = HttpStatus.INTERNAL_SERVER_ERROR
    //   message = 'PrismaClientUnknownRequestError'
    //   data = {
    //     message: exception.message,
    //     clientVersion: exception.clientVersion
    //   }
    // } else if (exception instanceof Prisma.PrismaClientValidationError) {
    //   message = 'PrismaClientValidationError'
    //   data = {
    //     message: exception.message,
    //     clientVersion: exception.clientVersion
    //   }
    // }
    // const responseBody = {
    //   code: httpStatus,
    //   message,
    //   data,
    //   timestamp: dayjs().unix()
    // }
    // httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus)
  }
}
