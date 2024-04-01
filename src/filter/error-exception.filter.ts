import { HttpException, HttpStatus } from '@nestjs/common'

/**
 * 业务异常（字符串模式）
 */
export class ErrorException extends HttpException {
  constructor(data) {
    const { code, message, data: _data } = data
    super({ code, message, data: _data }, HttpStatus.OK)
  }
}
