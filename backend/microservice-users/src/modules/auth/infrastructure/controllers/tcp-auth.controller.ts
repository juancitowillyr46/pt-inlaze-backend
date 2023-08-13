import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import { JoiValidationPipe } from "src/common/pipes/joi-validation.pipe";
import { ApiExtraModels, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthPresenter } from "./auth.presenter";
import { AuthDto } from "../../application/dtos/auth.dto";
import { AuthService } from "../../application/services/auth.service";
import { authSchema } from "../../domain/schema/auth.schema";
import { MessagePattern } from "@nestjs/microservices";

@Controller('auth')
export class TcpAuthController {
    constructor(private readonly authService: AuthService) {
    }

    @MessagePattern('user_auth')
    @UsePipes(new JoiValidationPipe(authSchema))
    async createUser(@Body() authDto: AuthDto): Promise<AuthPresenter> {
        const result = await this.authService.auth(authDto.username, authDto.password);
        return new AuthPresenter(`Auth: Se inicio la sesión de manera correcta`, result);
    }
}