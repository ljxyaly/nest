import { ArgumentsHost, ExceptionFilter, HttpException, Catch } from '@nestjs/common'
import { Response } from 'express'

@Catch(HttpException)
export class HttpExecptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse<Response>()
    const status = exception.getStatus()
    const originResponse = exception.getResponse()
    console.log(originResponse)
    const message = exception.message

    response.status(status).json({
      code: status,
      message: originResponse['message'] || message || 'fail',
      timestamp: new Date().getTime()
    })
  }
}

// import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common'
// import { Request, Response } from 'express'

// @Catch(HttpException)
// export class HttpExceptionFilter<T> implements ExceptionFilter {
//   catch(exception: HttpException, host: ArgumentsHost) {
//     const ctx = host.switchToHttp()
//     // const request = ctx.getRequest<Request>()
//     const response = ctx.getResponse<Response>()
//     const status = exception.getStatus()

//     response.status(status).json({
//       // data: [],
//       message: exception.message,
//       timestamp: new Date().getTime(),
//       // success: false,
//       // path: request.url,
//       code: status
//     })
//   }
// }
