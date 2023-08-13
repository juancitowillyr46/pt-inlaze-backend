import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import { JoiValidationPipe } from "src/common/pipes/joi-validation.pipe";
import { ApiExtraModels, ApiOperation, ApiTags } from "@nestjs/swagger";
import { AuthPresenter } from "./auth.presenter";
import { AuthDto } from "../../application/dtos/auth.dto";
import { AuthService } from "../../application/services/auth.service";
import { authSchema } from "../../domain/schema/auth.schema";

@Controller('auth')
export class HttpAuthController {
    constructor(private readonly authService: AuthService) {
    }

    @ApiExtraModels(AuthPresenter)
    @ApiOperation({ summary: 'Auth User' })
    @ApiTags('Auth')
    @Post()
    @UsePipes(new JoiValidationPipe(authSchema))
    async createUser(@Body() authDto: AuthDto): Promise<AuthPresenter> {
        const result = await this.authService.auth(authDto.username, authDto.password);
        return new AuthPresenter(`Auth: Se inicio la sesión de manera correcta`, result);
    }
}