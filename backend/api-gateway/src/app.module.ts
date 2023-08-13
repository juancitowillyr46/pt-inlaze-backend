import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { ExceptionsModule } from './infrastructure/exceptions/exceptions.module';

@Module({
  imports: [
    // HttpModule.register({
    //   baseURL: 'http://localhost:3001', // URL base para microservicio "users"
    // }),
    AuthModule,
    ExceptionsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
