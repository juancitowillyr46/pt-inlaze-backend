import { RoleDto } from "../application/role.dto";
import { RoleEntity } from "./role.entity";
import { RoleModel } from "./role.mode";

export const ROLE_REPOSITORY = Symbol('RoleRepository');

export interface RoleRepository {
    createRole(roleModel: RoleModel): Promise<RoleModel>;
    updateRole(roleId: number, roleModel: RoleModel): Promise<boolean>;
    deleteRole(roleId: number): Promise<boolean>;
    readAll(): Promise<RoleModel[]>;
    readRoleById(roleId: number): Promise<RoleModel>;

    // Common
    toModel(data: RoleEntity): RoleModel;
    toEntity(data: RoleModel): RoleEntity;
    convertDtoToModel(data: RoleDto): RoleModel;
}
