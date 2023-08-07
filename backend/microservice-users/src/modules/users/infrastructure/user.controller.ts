import { Body, Controller, Delete, Param, Post, Put, UsePipes, UseGuards } from "@nestjs/common";
import { UserDto } from "../application/user.dto";
import { UserService } from "../application/user.service";
import { JoiValidationPipe } from "src/common/pipes/joi-validation.pipe";
import { userSchema } from "../application/user.schema";
import { ApiBearerAuth, ApiExtraModels, ApiOperation, ApiTags } from "@nestjs/swagger";
import { UserPresenter } from "./user.presenter";
import { JwtAuthGuard } from "src/common/guards/jwtAuth.guard";

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @ApiExtraModels(UserPresenter)
    @ApiOperation({ summary: 'User Create' })
    @ApiTags('Users')
    @Post()
    async createUser(@Body(new JoiValidationPipe(userSchema)) userCreateDto: UserDto): Promise<UserPresenter> {
        const result = await this.userService.createUser(userCreateDto);
        return new UserPresenter(`Usuario: Creado correctamente`, result);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiExtraModels(UserPresenter)
    @ApiOperation({ summary: 'User Update '})
    @ApiTags('Users')
    @Put(':id')
    async updateUser(@Param('id') userId: number, @Body(new JoiValidationPipe(userSchema)) userUpdateDto: UserDto): Promise<UserPresenter> {
        const result = await this.userService.updateUser(Number(userId), userUpdateDto);
        return new UserPresenter(`Usuario: Actualizado correctamente`, result);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiExtraModels(UserPresenter)
    @ApiOperation({ summary: 'User Delete'})
    @ApiTags('Users')
    @Delete(':id')
    async deleteUser(@Param('id') userId: number): Promise<UserPresenter> {
        const result = await this.userService.deleteUser(Number(userId));
        return new UserPresenter(`Usuario: Eliminado correctamente`, result);
    }
}