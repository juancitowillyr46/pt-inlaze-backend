import { UserCreateDto } from "../../application/dtos/user-create.dto";
import { UserEntity } from "../entities/user.entity";
import { UserModel } from "../models/user.model";

export const USER_REPOSITORY = Symbol('UserRepository');

export interface UserRepository {
    createUser(userModel: UserModel): Promise<UserModel>;
    toModel(data: UserEntity): UserModel;
    toEntity(data: UserModel): UserEntity;
    convertDtoToEntity(data: UserCreateDto): UserModel;
    readByUsername(email: string): Promise<UserModel>;
}
