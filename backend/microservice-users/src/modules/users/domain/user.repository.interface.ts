import { UserDto } from "../application/user.dto";
import { UserEntity } from "./user.entity";
import { UserModel } from "./user.model";

export const USER_REPOSITORY = Symbol('UserRepository');

export interface UserRepository {
    createUser(userModel: UserModel): Promise<UserModel>;
    updateUser(userId: number, userModel: UserModel): Promise<boolean>;
    deleteUser(userId: number): Promise<boolean>;
    toModel(data: UserEntity): UserModel;
    toEntity(data: UserModel): UserEntity;
    convertDtoToModel(data: UserDto): UserModel;
    readByUsername(email: string): Promise<UserModel>;
}
