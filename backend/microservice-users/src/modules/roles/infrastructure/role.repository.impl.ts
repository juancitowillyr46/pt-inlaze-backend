import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseRepository } from "src/modules/users/domain/base.repository.abstract";
import { RoleEntity } from "src/modules/roles/domain/role.entity";
import { RoleModel } from "src/modules/roles/domain/role.mode";
import { RoleRepository } from "src/modules/roles/domain/role.repository.interface";
import { Repository } from "typeorm";
import { RoleDto } from "../application/role.dto";

@Injectable()
export class RoleRepositoryImpl extends BaseRepository<RoleEntity, RoleModel> implements RoleRepository {

    constructor(
        @InjectRepository(RoleEntity)
        private readonly roleRepository: Repository<RoleEntity>,
    ) {
        super()
    }

    async createRole(roleModel: RoleModel): Promise<RoleModel> {
        const entity = this.toEntity(roleModel);
        const command = await this.roleRepository.save(entity);
        return this.toModel(command as RoleEntity);
    }

    async updateRole(roleId: number, roleModel: RoleModel): Promise<boolean> {

        let commandFind = await this.findRoleById(roleId);

        if(commandFind) {
            const entity = this.toEntity(roleModel);
            const commandUpd = await this.roleRepository.update({
                id: roleId
            }, roleModel);
            commandFind = (commandUpd.affected > 0);
        }
        
        return commandFind;
    }

    async deleteRole(userId: number): Promise<boolean> {

        let commandFind = await this.findRoleById(userId);

        if(commandFind) {
            const commandUpd = await this.roleRepository.update({
                id: userId
            }, {
                isDeleted : true,
                updatedAt: new Date()
            });
            commandFind = (commandUpd.affected > 0);
        }

        return commandFind;
    }

    async readRoleById(roleId: number): Promise<RoleModel> {
        const commmandFind = await this.roleRepository.findOne({
            where: { id : roleId }
        });
        return this.toModel(commmandFind);
    }

    async findRoleById(userId: number): Promise<boolean>  {
        const commmandFind = await this.roleRepository.findOne({
            where: { id : userId }
        });
        return (commmandFind)? true : false;
    }

    async readAll(): Promise<RoleModel[]> {

        let roles: RoleEntity[] = await this.roleRepository.findBy({
            isDeleted: false
        });
        
        let roleModels: RoleModel[] = [];
        roles.forEach(role => {
            roleModels.push(this.toModel(role))
        });
        
        return roleModels;
    }

    toModel(data: RoleEntity): RoleModel {
        const model = new RoleModel()
        model.id = data.id;
        model.name = data.name;
        return model;
    }

    toEntity(data: RoleModel): RoleEntity {
        const entity = new RoleEntity();
        entity.id = data.id;
        entity.name = data.name;
        entity.createdAt = new Date();
        entity.updatedAt = null;
        return entity;
    }

    convertDtoToModel(roleDto: RoleDto) {
        const model = new RoleModel();
        model.id = roleDto.id;
        model.name = roleDto.name;
        return model;
    }
  
}