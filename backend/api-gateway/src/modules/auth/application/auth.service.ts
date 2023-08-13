import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { MICROSERVICE_USERS } from "src/infrastructure/config/constants/microservices-tokens.constant";
import { ExceptionsService } from "src/infrastructure/exceptions/exceptions.service";
import { AuthMessageDto } from "./auth.message.dto";

@Injectable()
export class AuthService {

    constructor(
        @Inject(MICROSERVICE_USERS) private readonly authClient: ClientProxy,
        private readonly exceptionsService: ExceptionsService
    ) {

    }

    async authHandler(authEvent: AuthMessageDto): Promise<AuthMessageDto> {

        try {
            console.log('handlerUserCreated - USERS', authEvent);
            const response = await this.authClient.send(
                'user_auth',
                authEvent 
            ).toPromise();

            return response;

        } catch (error: any) {
            
            this.exceptionsService.eventPatternException({
                message: error?.message
            });
        }

        
    }

}