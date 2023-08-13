import { Inject, Injectable } from "@nestjs/common";
import { UserDto } from "./user.dto";
import { USER_REPOSITORY, UserRepository } from "../domain/user.repository.interface";
import { UserModel } from "../domain/user.model";
import { BcryptService } from "src/infraestructure/services/bycript/bcrypt.service";
import { ExceptionsService } from "src/infraestructure/exceptions/exceptions.service";

@Injectable()
export class UserService {

    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepository: UserRepository,
        private readonly bcryptService: BcryptService,
        private readonly exceptionsService: ExceptionsService,
    ) {

    }

    async createUser(userDto: UserDto): Promise<UserModel> {
        const cryptPassword = await this.cryptPassword(userDto.password);        
        const model = this.userRepository.convertDtoToModel(userDto);
        model.password = cryptPassword;
        return this.userRepository.createUser(model);
    }

    async updateUser(userId: number, userDto: UserDto): Promise<boolean> {
        const cryptPassword = await this.cryptPassword(userDto.password);
        const model = this.userRepository.convertDtoToModel(userDto);
        model.password = cryptPassword;
        const operation = await this.userRepository.updateUser(userId, model);
        if(!operation){
            this.exceptionsService.badRequestException({message: 'Invalid: No fue posible actualizar el registro'});
        }
        return operation;
    }

    async deleteUser(userId: number): Promise<boolean> {
        const operation = await this.userRepository.deleteUser(userId);
        return operation;
    }
    
    private cryptPassword(password: string): Promise<string> {
        const cryptPassword = this.bcryptService.hash(password);  
        return cryptPassword; 
    }

    handleUserCreated(data: any) {
        console.log('handlerUserCreated - USERS', data);
        // TODO: Email the user...
        return data;
    }
}