import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserCreateDto } from "src/modules/users/application/dtos/user-create.dto";
import { BaseRepository } from "src/modules/users/domain/abstracts/base.repository.abstract";
import { RoleEntity } from "src/modules/users/domain/entities/role.entity";
import { UserEntity } from "src/modules/users/domain/entities/user.entity";
import { UserModel } from "src/modules/users/domain/models/user.model";
import { UserRepository } from "src/modules/users/domain/repositories/user.repository.interface";
import { Repository } from "typeorm";

@Injectable()
export class UserRepositoryImpl extends BaseRepository<UserEntity, UserModel> implements UserRepository {
    
    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,

        @InjectRepository(RoleEntity)
        private readonly roleRepository: Repository<RoleEntity>,
    ) {
        super()
    }

    async createUser(userModel: UserModel): Promise<UserModel> {

        const roleModel = await this.roleRepository.findOne({
            where: { id: 1 }
        });
        userModel.role = roleModel;
        
        const entity = this.toEntity(userModel);
        const command = await this.userRepository.save(entity);
        return this.toModel(command as UserEntity);
    }

    toModel(userEntity: UserEntity): UserModel {
        const model = new UserModel();
        model.id = userEntity.id;
        model.fullname = userEntity.fullname;
        model.email = userEntity.email;
        model.phone = userEntity.phone;
        model.password = userEntity.password;
        return model;
    }

    toEntity(userModel: UserModel): UserEntity {
        const entity = new UserEntity();
        entity.id = 0;
        entity.fullname = userModel.fullname;
        entity.email = userModel.email;
        entity.password = userModel.password;
        entity.phone = userModel.phone;
        entity.createdAt = new Date();
        entity.updatedAt = null;
        entity.role = userModel.role;
        return entity;
    }

    convertDtoToEntity(userDto: UserCreateDto) {
        const model = new UserModel();
        model.id = userDto.id;
        model.fullname = userDto.fullname;
        model.email = userDto.email;
        model.phone = userDto.phone;
        model.password = userDto.password;
        return model;
    }
    
}