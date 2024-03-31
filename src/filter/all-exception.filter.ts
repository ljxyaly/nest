import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'
import dayjs from 'dayjs'
import { Request, Response } from 'express'
@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const request = ctx.getRequest<Request>()
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR

    let data: any = {
      message: ''
    }
    console.log(exception)
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
    } else {
      data = {
        message: exception
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
  }
}
