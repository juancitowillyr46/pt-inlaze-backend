import { Module } from '@nestjs/common';
import { UserController } from './infrastructure/controllers/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './domain/entities/user.entity';
import { UserRepositoryImpl } from './infrastructure/persistence/repositories/user.repository.impl';
import { UserService } from './application/services/user.service';
import { USER_REPOSITORY } from './domain/repositories/user.repository.interface';
import { RoleEntity } from './domain/entities/role.entity';
import { ROLE_REPOSITORY } from './domain/repositories/role.repository.interface';
import { RoleRepositoryImpl } from './infrastructure/persistence/repositories/role.repository.impl';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, RoleEntity])],
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
