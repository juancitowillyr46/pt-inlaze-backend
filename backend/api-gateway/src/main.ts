import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configSwagger } from './infrastructure/config/swagger/swagger.config';
import { SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {

  const usingMicroservice = process.env.USING_MICROSERVICE === 'true';
  const port = Number(process.env.PORT) || 3000;

  if(!usingMicroservice) {
    const app = await NestFactory.create(AppModule);
    const document = SwaggerModule.createDocument(app, configSwagger);
    SwaggerModule.setup('api', app, document);
    await app.listen(port);
  }
  
}
bootstrap();
