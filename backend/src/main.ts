import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // CORS configurado para aceitar requisições do Live Server (porta 5500 ou 5501)
  app.enableCors({
    origin: true, 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Transform: true é vital para converter strings do formulário em números no DTO
  app.useGlobalPipes(new ValidationPipe({ 
    whitelist: true, 
    transform: true,
    transformOptions: { enableImplicitConversion: true }
  }));

  await app.listen(process.env.PORT ?? 4000);
  console.log(`🚀 Servidor rodando em: http://localhost:4000`);
}
void bootstrap();