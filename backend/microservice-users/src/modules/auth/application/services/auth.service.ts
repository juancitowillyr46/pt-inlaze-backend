import { Inject, Injectable } from "@nestjs/common";

import { BcryptService } from "src/infraestructure/services/bycript/bcrypt.service";
import { USER_REPOSITORY, UserRepository } from "src/modules/users/domain/user.repository.interface";
import { AuthModel } from "../../domain/models/auth.model";
import { ExceptionsService } from "src/infraestructure/exceptions/exceptions.service";
import { EnvironmentConfigService } from "src/infraestructure/config/environment-config/environment-config.service";
import { JwtTokenService } from "src/infraestructure/services/jwt/jwt.service";

@Injectable()
export class AuthService {

    constructor(
        @Inject(USER_REPOSITORY)
        private readonly userRepository: UserRepository,
        private readonly bcryptService: BcryptService,
        private readonly exceptionsService: ExceptionsService,
        private readonly jwtTokenService: JwtTokenService,
        private readonly environmentConfigService: EnvironmentConfigService
    ) {

    }

    async auth(email: string, password: string): Promise<AuthModel> {

        const command = await this.userRepository.readByUsername(email);

        if(!command) {
            this.exceptionsService.unauthorizedException({
                message: 'Invalid: user not exist'
            });
        }

        const validatePassword = await this.bcryptService.compare(password, command.password);

        if(command.password && !validatePassword) {
            this.exceptionsService.unauthorizedException({
                message: 'Invalid: user password incorrect'
            });
        }

        const model = new AuthModel();

        const secret = this.environmentConfigService.getJwtSecret();
        const expirationTime = this.environmentConfigService.getJwtExpirationTime();

        model.token = this.jwtTokenService.createToken({
            id: command.id,
            username: command.email
        },secret, expirationTime);

        model.fullname = command.fullname;

        return model;
    }

}