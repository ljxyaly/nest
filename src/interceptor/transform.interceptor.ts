import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import dayjs from 'dayjs'

export interface Response<T> {
  data: T
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    // const response = context.switchToHttp().getResponse()
    return next.handle().pipe(
      map((data) => {
        return {
          // statusCode: response.statusCode,
          code: 0,
          message: '请求成功',
          data: data,
          timestamp: dayjs().unix()
        }
      })
    )
  }
}
