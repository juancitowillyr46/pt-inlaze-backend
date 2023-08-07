import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { JoiValidationPipe } from "src/common/pipes/joi-validation.pipe";
import { ApiBearerAuth, ApiExtraModels, ApiOperation, ApiTags } from "@nestjs/swagger";
import { RolePresenter } from "./role.presenter";
import { RoleService } from "../application/role.service";
import { RoleDto } from "../application/role.dto";
import { roleSchema } from "../application/role.schema";
import { JwtAuthGuard } from "src/common/guards/jwtAuth.guard";

@Controller('roles')
export class RoleController {
    constructor(private readonly roleService: RoleService) {
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiExtraModels(RolePresenter)
    @ApiOperation({ summary: 'Role Create' })
    @ApiTags('Roles')
    @Post()
    async createrole(@Body(new JoiValidationPipe(roleSchema)) roleCreateDto: RoleDto): Promise<RolePresenter> {
        const result = await this.roleService.createRole(roleCreateDto);
        return new RolePresenter(`Role: Creado correctamente`, result);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiExtraModels(RolePresenter)
    @ApiOperation({ summary: 'Role Update '})
    @ApiTags('Roles')
    @Put(':id')
    async updaterole(@Param('id') roleId: number, @Body(new JoiValidationPipe(roleSchema)) roleUpdateDto: RoleDto): Promise<RolePresenter> {
        const result = await this.roleService.updateRole(Number(roleId), roleUpdateDto);
        return new RolePresenter(`Role: Actualizado correctamente`, result);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiExtraModels(RolePresenter)
    @ApiOperation({ summary: 'Role Delete'})
    @ApiTags('Roles')
    @Delete(':id')
    async deleterole(@Param('id') roleId: number): Promise<RolePresenter> {
        const result = await this.roleService.deleteRole(Number(roleId));
        return new RolePresenter(`Role: Eliminado correctamente`, result);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiExtraModels(RolePresenter)
    @ApiOperation({ summary: 'Roles All'})
    @ApiTags('Roles')
    @Get()
    async readAllRoles(): Promise<RolePresenter> {
        const result = await this.roleService.readAllRoles();
        return new RolePresenter(`Role: listado correctamente`, result);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiExtraModels(RolePresenter)
    @ApiOperation({ summary: 'Roles By Id'})
    @ApiTags('Roles')
    @Get(':id')
    async readById(@Param('id') roleId: number): Promise<RolePresenter> {
        const result = await this.roleService.readRoleById(roleId);
        return new RolePresenter(`Role: detalle visible correctamente`, result);
    }
    
}