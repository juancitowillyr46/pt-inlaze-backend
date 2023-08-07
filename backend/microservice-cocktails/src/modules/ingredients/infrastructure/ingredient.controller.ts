import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { JoiValidationPipe } from "src/common/pipes/joi-validation.pipe";
import { ApiBearerAuth, ApiExtraModels, ApiOperation, ApiTags } from "@nestjs/swagger";
import { IngredientPresenter } from "./ingredient.presenter";
import { IngredientService } from "../application/ingredient.service";

import { ingredientSchema } from "../application/ingredient.schema";
import { JwtAuthGuard } from "src/common/guards/jwtAuth.guard";
import { IngredientDto } from "../application/ingrediente.dto";

@Controller('ingredients')
export class IngredientController {
    constructor(private readonly ingredientService: IngredientService) {
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiExtraModels(IngredientPresenter)
    @ApiOperation({ summary: 'Ingredient Create' })
    @ApiTags('Ingredients')
    @Post()
    async createingredient(@Body(new JoiValidationPipe(ingredientSchema)) ingredientCreateDto: IngredientDto): Promise<IngredientPresenter> {
        const result = await this.ingredientService.createIngredient(ingredientCreateDto);
        return new IngredientPresenter(`Ingredient: Creado correctamente`, result);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiExtraModels(IngredientPresenter)
    @ApiOperation({ summary: 'Ingredient Update '})
    @ApiTags('Ingredients')
    @Put(':id')
    async updateingredient(@Param('id') ingredientId: number, @Body(new JoiValidationPipe(ingredientSchema)) ingredientUpdateDto: IngredientDto): Promise<IngredientPresenter> {
        const result = await this.ingredientService.updateIngredient(Number(ingredientId), ingredientUpdateDto);
        return new IngredientPresenter(`Ingredient: Actualizado correctamente`, result);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiExtraModels(IngredientPresenter)
    @ApiOperation({ summary: 'Ingredient Delete'})
    @ApiTags('Ingredients')
    @Delete(':id')
    async deleteingredient(@Param('id') ingredientId: number): Promise<IngredientPresenter> {
        const result = await this.ingredientService.deleteIngredient(Number(ingredientId));
        return new IngredientPresenter(`Ingredient: Eliminado correctamente`, result);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiExtraModels(IngredientPresenter)
    @ApiOperation({ summary: 'Ingredients All'})
    @ApiTags('Ingredients')
    @Get()
    async readAllIngredients(): Promise<IngredientPresenter> {
        const result = await this.ingredientService.readAllIngredients();
        return new IngredientPresenter(`Ingredient: listado correctamente`, result);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiExtraModels(IngredientPresenter)
    @ApiOperation({ summary: 'Ingredients By Id'})
    @ApiTags('Ingredients')
    @Get(':id')
    async readById(@Param('id') ingredientId: number): Promise<IngredientPresenter> {
        const result = await this.ingredientService.readIngredientById(ingredientId);
        return new IngredientPresenter(`Ingredient: detalle visible correctamente`, result);
    }
    
}