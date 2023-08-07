import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, Query } from "@nestjs/common";
import { JoiValidationPipe } from "src/common/pipes/joi-validation.pipe";
import { ApiBearerAuth, ApiExtraModels, ApiOperation, ApiTags } from "@nestjs/swagger";

import { JwtAuthGuard } from "src/common/guards/jwtAuth.guard";
import { CocktailService } from "../application/cocktail.service";
import { CocktailPresenter } from "./cocktail.presenter";
import { cocktailSchema } from "../application/cocktail.schema";
import { CocktailDto } from "../application/cocktail.dto";

@Controller('cocktails')
export class CocktailController {
    constructor(private readonly cocktailService: CocktailService) {
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiExtraModels(CocktailPresenter)
    @ApiOperation({ summary: 'Cocktail Create' })
    @ApiTags('Cocktails')
    @Post()
    async createCocktail(@Body(new JoiValidationPipe(cocktailSchema)) cocktailCreateDto: CocktailDto): Promise<CocktailPresenter> {
        const result = await this.cocktailService.createCocktail(cocktailCreateDto);
        return new CocktailPresenter(`Cocktail: Creado correctamente`, result);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiExtraModels(CocktailPresenter)
    @ApiOperation({ summary: 'Cocktail Update '})
    @ApiTags('Cocktails')
    @Put(':id')
    async updateCocktail(@Param('id') cocktailId: number, @Body(new JoiValidationPipe(cocktailSchema)) cocktailUpdateDto: CocktailDto): Promise<CocktailPresenter> {
        const result = await this.cocktailService.updateCocktail(Number(cocktailId), cocktailUpdateDto);
        return new CocktailPresenter(`Cocktail: Actualizado correctamente`, result);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiExtraModels(CocktailPresenter)
    @ApiOperation({ summary: 'Cocktail Delete'})
    @ApiTags('Cocktails')
    @Delete(':id')
    async deleteCocktail(@Param('id') cocktailId: number): Promise<CocktailPresenter> {
        const result = await this.cocktailService.deleteCocktail(Number(cocktailId));
        return new CocktailPresenter(`Cocktail: Eliminado correctamente`, result);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiExtraModels(CocktailPresenter)
    @ApiOperation({ summary: 'Get Cocktails'})
    @ApiTags('Cocktails')
    @Get()
    async readAllCocktails(): Promise<CocktailPresenter> {
        const result = await this.cocktailService.readAllCocktails();
        return new CocktailPresenter(`Cocktail: listado correctamente`, result);
    }


    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiExtraModels(CocktailPresenter)
    @ApiOperation({ summary: 'Get Cocktails By Ingredient Name'})
    @ApiTags('Cocktails')
    @Get('byName')
    async readCocktailsByName(@Query('name') name: string): Promise<CocktailPresenter> {
        const result = await this.cocktailService.readCocktailsByName(name);
        return new CocktailPresenter(`Cocktail: se listó correctamente`, result);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiExtraModels(CocktailPresenter)
    @ApiOperation({ summary: 'Get Cocktails By Ingredient Name'})
    @ApiTags('Cocktails')
    @Get('byIngredientName')
    async readCocktailsByIngredient(@Query('ingredienteName') ingredientName: string): Promise<CocktailPresenter> {
        const result = await this.cocktailService.readCocktailsByIngredient(ingredientName);
        return new CocktailPresenter(`Cocktail: se listó correctamente`, result);
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiExtraModels(CocktailPresenter)
    @ApiOperation({ summary: 'Get Cocktails By Ingredient Quantity'})
    @ApiTags('Cocktails')
    @Get('byIngredientQuantity')
    async readCocktailsByIngredientCount(@Query('ingredientQuantity') ingredientQuantity: number): Promise<CocktailPresenter> {
        const result = await this.cocktailService.readCocktailsByIngredientQuantity(Number(ingredientQuantity));
        return new CocktailPresenter(`Cocktail: se listó correctamente`, result);
    }
    
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiExtraModels(CocktailPresenter)
    @ApiOperation({ summary: 'Cocktail By Id'})
    @ApiTags('Cocktails')
    @Get(':id')
    async readById(@Param('id') cocktailId: number): Promise<CocktailPresenter> {
        const result = await this.cocktailService.readCocktailById(cocktailId);
        return new CocktailPresenter(`Cocktail: detalle visible correctamente`, result);
    }
}