import { ExceptionFilter, Catch, ArgumentsHost, HttpException, HttpStatus } from '@nestjs/common'
import { HttpAdapterHost } from '@nestjs/core'
import dayjs from 'dayjs'
import { Response } from 'express'
import { ErrorException } from './error-exception.filter'
import { UniqueConstraintError } from 'sequelize'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  catch(exception: unknown, host: ArgumentsHost): void {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const status = exception instanceof HttpException ? exception.getStatus() : HttpStatus.INTERNAL_SERVER_ERROR

    let data = null
    let message = '请求失败'
    let code = 1

    // console.log(exception)
    // console.log(exception instanceof UniqueConstraintError) 违反唯一约束

    if (exception instanceof ErrorException) {
      code = exception.getResponse()['code']
      message = exception.getResponse()['message']
      data = exception.getResponse()['data']
    } else if (exception instanceof HttpException) {
      message = exception.getResponse()['message']
    } else {
      data = exception
    }

    const errorResponse = {
      data: data || null,
      message,
      code,
      timestamp: dayjs().unix()
    }
    response.status(status)
    response.header('Content-Type', 'application/json; charset=utf-8')
    response.send(errorResponse)
  }
}
