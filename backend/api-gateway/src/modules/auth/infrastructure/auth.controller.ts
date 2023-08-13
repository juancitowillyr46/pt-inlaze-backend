import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import { ApiExtraModels, ApiOperation, ApiTags } from "@nestjs/swagger";
import { ResponsePresenter } from "src/core/common/presenters/response.presenter";
import { JoiValidationPipe } from "src/core/common/pipes/joi-validation.pipe";
import { authValidate } from "../application/auth.validate";
import { AuthService } from "../application/auth.service";
import { AuthMessageDto } from "../application/auth.message.dto";

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) {
    }

    @ApiExtraModels(ResponsePresenter)
    @ApiOperation({ summary: 'Auth User' })
    @ApiTags('Auth')
    @Post()
    @UsePipes(new JoiValidationPipe(authValidate))
    async createUser(@Body() authMessageDto: AuthMessageDto): Promise<ResponsePresenter> {
        const response = await this.authService.authHandler(authMessageDto);
        const changeResponse = this.extractAttributeIfExists(response, 'token');
        return new ResponsePresenter(`Auth Microservice: Login is correct`, changeResponse);
    }

    // Función para extraer un atributo específico si existe en la respuesta
    extractAttributeIfExists(response: any, attributeName: string): any {
        return response.data && response.data[attributeName] ? response.data[attributeName] : null;
    }
}