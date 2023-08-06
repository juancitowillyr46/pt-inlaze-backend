import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleEntity } from '../roles/domain/role.entity';
import { ROLE_REPOSITORY } from '../roles/domain/role.repository.interface';
import { RoleRepositoryImpl } from '../roles/infrastructure/role.repository.impl';
import { ExceptionsModule } from 'src/infraestructure/exceptions/exceptions.module';
import { RoleController } from './infrastructure/role.controller';
import { RoleService } from './application/role.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RoleEntity]),
    ExceptionsModule
  ],
  controllers: [RoleController],
  providers: [
    {
      provide: ROLE_REPOSITORY,
      useClass: RoleRepositoryImpl,
    },
    RoleService
  ],
  exports: [
    ROLE_REPOSITORY
  ]
})
export class RolesModule {}
