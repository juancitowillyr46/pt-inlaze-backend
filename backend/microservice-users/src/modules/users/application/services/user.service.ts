import { Inject, Injectable } from "@nestjs/common";
import { UserCreateDto } from "../dtos/user-create.dto";
import { USER_REPOSITORY, UserRepository } from "../../domain/repositories/user.repository.interface";
import { UserModel } from "../../domain/models/user.model";

@Injectable()
export class UserService {

    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepository: UserRepository
    ) {

    }

    async createUser(userCreateDto: UserCreateDto): Promise<UserModel> {
        const model = this.userRepository.convertDtoToEntity(userCreateDto);
        return this.userRepository.createUser(model);
    }

}