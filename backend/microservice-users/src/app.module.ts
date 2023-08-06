import { Module } from '@nestjs/common';
import { TypeOrmConfigModule } from './infraestructure/config/typeorm/typeorm.module';
import { UsersModule } from './modules/users/users.module';
import { BcryptModule } from './infraestructure/services/bycript/bycript.module';
import { ExceptionsModule } from './infraestructure/exceptions/exceptions.module';
import { AuthModule } from './modules/auth/auth.module';
import { EnvironmentConfigModule } from './infraestructure/config/environment-config/environment-config.module';
import { RolesModule } from './modules/roles/roles.modules';

@Module({
  imports: [
    UsersModule,
    RolesModule,
    AuthModule,
    TypeOrmConfigModule,
    EnvironmentConfigModule,
    BcryptModule,
    ExceptionsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
