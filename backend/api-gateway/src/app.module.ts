import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    HttpModule.register({
      baseURL: 'http://localhost:3001', // URL base para microservicio "users"
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
