import { Module } from '@nestjs/common';
import { UserController } from './infrastructure/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './domain/user.entity';
import { UserRepositoryImpl } from './infrastructure/user.repository.impl';
import { UserService } from './application/user.service';
import { USER_REPOSITORY } from './domain/user.repository.interface';
import { RoleEntity } from '../roles/domain/role.entity';
import { ROLE_REPOSITORY } from '../roles/domain/role.repository.interface';
import { RoleRepositoryImpl } from '../roles/infrastructure/role.repository.impl';
import { BcryptModule } from 'src/infraestructure/services/bycript/bycript.module';
import { ExceptionsModule } from 'src/infraestructure/exceptions/exceptions.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, RoleEntity]),
    BcryptModule,
    ExceptionsModule
  ],
  controllers: [UserController],
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: UserRepositoryImpl,
    },
    {
      provide: ROLE_REPOSITORY,
      useClass: RoleRepositoryImpl
    },
    UserService
  ],
  exports: [
    USER_REPOSITORY,
    ROLE_REPOSITORY
  ]
})
export class UsersModule {}
