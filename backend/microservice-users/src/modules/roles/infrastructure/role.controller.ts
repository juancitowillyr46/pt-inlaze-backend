import { Body, Controller, Delete, Get, Param, Post, Put, UsePipes } from "@nestjs/common";
import { JoiValidationPipe } from "src/common/pipes/joi-validation.pipe";
import { ApiExtraModels, ApiOperation, ApiTags } from "@nestjs/swagger";
import { RolePresenter } from "./role.presenter";
import { RoleService } from "../application/role.service";
import { RoleDto } from "../application/role.dto";
import { roleSchema } from "../application/role.schema";

@Controller('roles')
export class RoleController {
    constructor(private readonly roleService: RoleService) {
    }

    @ApiExtraModels(RolePresenter)
    @ApiOperation({ summary: 'Role Create' })
    @ApiTags('roles')
    @Post()
    async createrole(@Body(new JoiValidationPipe(roleSchema)) roleCreateDto: RoleDto): Promise<RolePresenter> {
        const result = await this.roleService.createRole(roleCreateDto);
        return new RolePresenter(`Role: Creado correctamente`, result);
    }

    @ApiExtraModels(RolePresenter)
    @ApiOperation({ summary: 'Role Update '})
    @ApiTags('roles')
    @Put(':id')
    async updaterole(@Param('id') roleId: number, @Body(new JoiValidationPipe(roleSchema)) roleUpdateDto: RoleDto): Promise<RolePresenter> {
        const result = await this.roleService.updateRole(Number(roleId), roleUpdateDto);
        return new RolePresenter(`Role: Actualizado correctamente`, result);
    }

    @ApiExtraModels(RolePresenter)
    @ApiOperation({ summary: 'Role Delete'})
    @ApiTags('roles')
    @Delete(':id')
    async deleterole(@Param('id') roleId: number): Promise<RolePresenter> {
        const result = await this.roleService.deleteRole(Number(roleId));
        return new RolePresenter(`Role: Eliminado correctamente`, result);
    }

    @ApiExtraModels(RolePresenter)
    @ApiOperation({ summary: 'Roles All'})
    @ApiTags('roles')
    @Get()
    async readAll(): Promise<RolePresenter> {
        const result = await this.roleService.readAll();
        return new RolePresenter(`Role: listado correctamente`, result);
    }

    @ApiExtraModels(RolePresenter)
    @ApiOperation({ summary: 'Roles By Id'})
    @ApiTags('roles')
    @Get(':id')
    async readById(@Param('id') roleId: number): Promise<RolePresenter> {
        const result = await this.roleService.readRoleById(roleId);
        return new RolePresenter(`Role: detalle visible correctamente`, result);
    }
    
}