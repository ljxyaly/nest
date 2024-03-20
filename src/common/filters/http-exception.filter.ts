import { ArgumentsHost, ExceptionFilter, HttpException, Catch } from '@nestjs/common'
import { Response } from 'express'
import dayjs from 'dayjs'

@Catch(HttpException)
export class HttpExecptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const status = exception.getStatus()
    const originResponse = exception.getResponse()
    // console.log(originResponse)
    const message = exception.message

    response.status(status).json({
      code: status,
      message: originResponse['message'] || message || 'fail',
      timestamp: dayjs().unix()
    })
  }
}
