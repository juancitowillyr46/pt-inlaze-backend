import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDto } from "src/modules/users/application/user.dto";
import { BaseRepository } from "src/config/abstracts/base.repository.abstract";
import { RoleEntity } from "src/modules/roles/domain/role.entity";
import { UserEntity } from "src/modules/users/domain/user.entity";
import { UserModel } from "src/modules/users/domain/user.model";
import { UserRepository } from "src/modules/users/domain/user.repository.interface";
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
        const model = await this.assignedRole(userModel);
        const entity = this.toEntity(model);
        const command = await this.userRepository.save(entity);
        return this.toModel(command);
    }

    async updateUser(userId: number, userModel: UserModel): Promise<boolean> {

        let commandFind = await this.readUserById(userId);

        if(commandFind) {
            const model = await this.assignedRole(userModel);
            const entity = this.toEntity(model);
            const commandUpd = await this.userRepository.update({
                id: userId
            }, entity);
            commandFind = (commandUpd.affected > 0);
        }
        
        return commandFind;
    }

    async deleteUser(userId: number): Promise<boolean> {

        let commandFind = await this.readUserById(userId);

        if(commandFind) {
            const commandUpd = await this.userRepository.update({
                id: userId
            }, {
                isDeleted : true,
                updatedAt: new Date()
            });
            commandFind = (commandUpd.affected > 0);
        }

        return commandFind;
    }

    async readByUsername(email: string): Promise<UserModel> {

        const commmand = await this.userRepository.findOne({
            where: { email : email }
        });

        return this.toModel(commmand);
    }

    toModel(userEntity: UserEntity): UserModel {
        const model = new UserModel();
        model.id = userEntity.id;
        model.fullname = userEntity.fullname;
        model.email = userEntity.email;
        model.phone = userEntity.phone;
        model.password = userEntity.password;
        model.roleId = userEntity.role?.id;
        return model;
    }

    toEntity(userModel: UserModel): UserEntity {
        const entity = new UserEntity();
        entity.id = userModel.id;
        entity.fullname = userModel.fullname;
        entity.email = userModel.email;
        entity.password = userModel.password;
        entity.phone = userModel.phone;
        entity.createdAt = new Date();
        entity.updatedAt = null;
        entity.isDeleted = false;
        entity.role = userModel.role;
        return entity;
    }

    convertDtoToModel(userDto: UserDto) {
        const model = new UserModel();
        model.id = userDto.id;
        model.fullname = userDto.fullname;
        model.email = userDto.email;
        model.phone = userDto.phone;
        model.password = userDto.password;
        model.roleId = userDto.roleId;
        return model;
    }

    async readUserById(userId: number): Promise<boolean>  {
        const commmandFind = await this.userRepository.findOne({
            where: { id : userId }
        });
        return (commmandFind)? true : false;
    }

    async assignedRole(userModel: UserModel): Promise<UserModel> {
        const roleModel = await this.roleRepository.findOne({
            where: { id: userModel.roleId }
        });
        userModel.role = roleModel;
        return userModel;
    }
    
}