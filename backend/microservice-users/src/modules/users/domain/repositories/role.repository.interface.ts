import { RoleModel } from "../models/role.mode";

export const ROLE_REPOSITORY = Symbol('RoleRepository');

export interface RoleRepository {
    //createUser(userModel: UserModel): Promise<UserModel>;
    readById(roleId: number): Promise<RoleModel>;
    // toModel(data: UserEntity): UserModel;
    // toEntity(data: UserModel): UserEntity;
    // convertDtoToEntity(data: UserCreateDto): UserModel;
}
