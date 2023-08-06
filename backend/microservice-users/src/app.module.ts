import { Module } from '@nestjs/common';
import { TypeOrmConfigModule } from './infraestructure/config/typeorm/typeorm.module';
import { UsersModule } from './modules/users/users.module';
import { BcryptModule } from './infraestructure/services/bycript/bycript.module';

@Module({
  imports: [
    TypeOrmConfigModule,
    UsersModule,
    BcryptModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
