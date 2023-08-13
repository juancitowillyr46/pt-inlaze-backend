import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { configSwagger } from './infraestructure/config/swagger/swagger.config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {

  const usingMicroservice = process.env.USING_MICROSERVICE === 'true';
  const port = Number(process.env.PORT) || 3000;

  if(usingMicroservice) {

    const app = await NestFactory.createMicroservice<MicroserviceOptions>(
      AppModule,
      {
        transport: Transport.TCP,
        options: {
          port: port,
        }
      },
    );
    await app.listen();

  } else {

    const app = await NestFactory.create(AppModule);
    const document = SwaggerModule.createDocument(app, configSwagger);
    SwaggerModule.setup('api', app, document);
    app.listen(port);

  }

}
bootstrap();
