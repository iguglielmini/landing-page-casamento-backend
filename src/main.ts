import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 📄 Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('Landing Page Casamento')
    .setDescription('API para gerenciamento de convidados')
    .setVersion('1.0')
    .addTag('Guests')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 3333);
}
bootstrap();
