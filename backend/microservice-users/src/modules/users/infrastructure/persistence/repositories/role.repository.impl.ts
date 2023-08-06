import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserCreateDto } from "src/modules/users/application/dtos/user-create.dto";
import { BaseRepository } from "src/modules/users/domain/abstracts/base.repository.abstract";
import { RoleEntity } from "src/modules/users/domain/entities/role.entity";
import { RoleModel } from "src/modules/users/domain/models/role.mode";
import { RoleRepository } from "src/modules/users/domain/repositories/role.repository.interface";
import { Repository } from "typeorm";

@Injectable()
export class RoleRepositoryImpl extends BaseRepository<RoleEntity, RoleModel> implements RoleRepository {

    toModel(data: RoleEntity): RoleModel {
        const model = new RoleModel()
        model.id = data.id;
        model.name = data.name;
        return model;
    }

    toEntity(data: RoleModel): RoleEntity {
        throw new Error("Method not implemented.");
    }
    
    constructor(
        @InjectRepository(RoleEntity)
        private readonly roleRepository: Repository<RoleEntity>,
    ) {
        super()
    }

    async readById(roleId: number): Promise<RoleModel> {
        const command = await this.roleRepository.findOne({
            where: {id: roleId}
        });
        return this.toModel(command);
    }

  
}