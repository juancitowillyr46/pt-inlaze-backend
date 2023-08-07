import { Inject, Injectable } from "@nestjs/common";
import { ExceptionsService } from "src/infraestructure/exceptions/exceptions.service";
import { ROLE_REPOSITORY, RoleRepository } from "../domain/role.repository.interface";
import { RoleDto } from "./role.dto";
import { RoleModel } from "../domain/role.mode";

@Injectable()
export class RoleService {

    constructor(
        @Inject(ROLE_REPOSITORY)
        private readonly roleRepository: RoleRepository,
        private readonly exceptionsService: ExceptionsService,
    ) {

    }

    async createRole(roleDto: RoleDto): Promise<RoleModel> {        
        const model = this.roleRepository.convertDtoToModel(roleDto);
        const operation = await this.roleRepository.createRole(model);
        return operation;
    }

    async updateRole(roleId: number, roleDto: RoleDto): Promise<boolean> {
        const model = this.roleRepository.convertDtoToModel(roleDto);
        const operation = await this.roleRepository.updateRole(roleId, model);
        if(!operation){
            this.exceptionsService.badRequestException({message: 'Invalid: No fue posible actualizar el registro'});
        }
        return operation;
    }

    async deleteRole(roleId: number): Promise<boolean> {
        const operation = await this.roleRepository.deleteRole(roleId);
        return operation;
    }

    async readAllRoles(): Promise<RoleModel[]> {
        const operation = await this.roleRepository.readAllRoles();
        return operation;
    }

    async readRoleById(roleId: number): Promise<RoleModel> {
        const operation = await this.roleRepository.readRoleById(roleId);
        return operation;
    }
    
}