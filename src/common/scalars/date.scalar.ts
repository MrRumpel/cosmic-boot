import { Scalar, CustomScalar } from '@nestjs/graphql'
import { Kind, ValueNode } from 'graphql'
import moment from 'moment'

@Scalar('Date', (type) => Date)
export class DateScalar implements CustomScalar<string, Date> {
  description = 'Date custom scalar type';

  parseValue (value: string): Date {
    return new Date(value) // 解析GraphQL变量
  }

  serialize (value: Date): string {
    return moment(value).format('YYYY-MM-DD HH:mm:ss') // 使用moment格式化日期字符串
  }

  parseLiteral (ast: ValueNode): Date {
    if (ast.kind === Kind.STRING) {
      return new Date(ast.value) // 解析硬编码的日期值
    }
    return null
  }
}
