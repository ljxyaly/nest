import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
// import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true
  })
  app.setGlobalPrefix('api')
  app.enableVersioning()
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true
    })
  )

  // const config = new DocumentBuilder()
  //   .setTitle('api文档')
  //   .setDescription('api文档')
  //   .setVersion('1.0')
  //   .addTag('api')
  //   .build();
  // const document = SwaggerModule.createDocument(app, config);
  // SwaggerModule.setup('api', app, document);
  await app.listen(3000)
}
bootstrap()
