import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const prefix = process.env.API_PREFIX || 'api';
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(prefix);

  // 📄 Configuração do Swagger
  const config = new DocumentBuilder()
    .setTitle('Landing Page Casamento')
    .setDescription('API para gerenciamento de convidados')
    .setVersion('1.0')
    .addTag('Guests')
    .setBasePath(prefix)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${prefix}/doc`, app, document);

  await app.listen(process.env.PORT ?? 3333);
}
bootstrap();
