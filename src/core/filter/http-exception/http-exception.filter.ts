import { message } from 'antd'
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException
} from '@nestjs/common'
import { isString } from 'class-validator'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch (exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp() // 获取请求上下文
    const response = ctx.getResponse() // 获取请求上下文中的 response对象
    const status = exception.getStatus() // 获取异常状态码
    // 设置错误信息
    const message = isString(exception.getResponse())
      ? exception.getResponse()
      : (exception.getResponse() as { message: string }).message
    const errorResponse = {
      data: {},
      message,
      code: -1
    }

    // 设置返回的状态码， 请求头，发送错误信息
    response.status(status)
    response.header('Content-Type', 'application/json; charset=utf-8')
    response.send(errorResponse)
  }
}
