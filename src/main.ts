import { NestFactory } from '@nestjs/core'
import { AppModule } from '@/app.module'
import { ValidationPipe } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'

// 重写BigInt的toJSON方法，解决Do not know how to serialize a BigInt问题
declare global {
  interface BigInt {
    toJSON(): string
  }
}
BigInt.prototype.toJSON = function () {
  const int = Number.parseInt(this.toString())
  return int ?? this.toString()
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true
  })
  app.setGlobalPrefix('api')
  app.enableVersioning()
  app.useGlobalPipes(new ValidationPipe())
  // addTag('标签') setDescription('描述')
  const config = new DocumentBuilder().setTitle('Api Doc').setVersion('1.0').addBearerAuth().build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)
  await app.listen(3000)
}
bootstrap()
