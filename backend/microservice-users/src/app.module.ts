import { Module } from '@nestjs/common';
import { TypeOrmConfigModule } from './infraestructure/config/typeorm/typeorm.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    TypeOrmConfigModule,
    UsersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
