import { Body, Controller, Post, UsePipes } from "@nestjs/common";
import { UserCreateDto } from "../../application/dtos/user-create.dto";
import { UserCreatePresenter } from "./user-create.presenter";
import { UserService } from "../../application/services/user.service";
import { JoiValidationPipe } from "src/common/pipes/joi-validation.pipe";
import { createUserSchema } from "../../domain/schema/user.schema";
import { ApiExtraModels, ApiOperation, ApiTags } from "@nestjs/swagger";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @ApiExtraModels(UserCreatePresenter)
    @ApiOperation({ summary: 'Create user' })
    @ApiTags('Users')
    @Post()
    @UsePipes(new JoiValidationPipe(createUserSchema))
    // new JoiValidationPipe(createUserSchema)
    async createUser(@Body() userCreateDto: UserCreateDto): Promise<UserCreatePresenter> {
        const result = await this.userService.createUser(userCreateDto);
        return new UserCreatePresenter(result);
    }
}