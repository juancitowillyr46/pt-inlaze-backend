import { Inject, Injectable } from "@nestjs/common";
import { UserCreateDto } from "../dtos/user-create.dto";
import { USER_REPOSITORY, UserRepository } from "../../domain/repositories/user.repository.interface";
import { UserModel } from "../../domain/models/user.model";
import { BcryptService } from "src/infraestructure/services/bycript/bcrypt.service";

@Injectable()
export class UserService {

    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepository: UserRepository,
        private readonly bcryptService: BcryptService
    ) {

    }

    async createUser(userCreateDto: UserCreateDto): Promise<UserModel> {
        const cryptPassword = await this.bcryptService.hash(userCreateDto.password);        
        const model = this.userRepository.convertDtoToEntity(userCreateDto);
        model.password = cryptPassword;
        return this.userRepository.createUser(model);
    }

}