import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common'
import { HttpException } from '@nestjs/common'

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()
    // const request = ctx.getRequest()
    // const originResponse = exception.getResponse()
    // const message = exception.message
    // console.log(exception.getResponse())
    const status = exception instanceof HttpException ? exception.getStatus() : 600
    const message = exception instanceof HttpException ? exception.getResponse()['message'] || 'fasle' : exception.toString()
    response.status(status).json({
      code: status,
      message,
      timestamp: new Date().getTime()
    })
  }
}
