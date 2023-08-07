import { Inject, Injectable } from "@nestjs/common";
import { ExceptionsService } from "src/infraestructure/exceptions/exceptions.service";

import { COCKTAIL_REPOSITORY, CocktailRepository } from "../domain/cocktail.repository.interface";
import { CocktailModel } from "../domain/cocktail.mode";
import { CocktailDto } from "./cocktail.dto";
import { INGREDIENT_REPOSITORY, IngredientRepository } from "src/modules/ingredients/domain/ingredient.repository.interface";
import { CocktailsModule } from "../cocktails.module";

@Injectable()
export class CocktailService {

    constructor(
        @Inject(COCKTAIL_REPOSITORY)
        private readonly cocktailRepository: CocktailRepository,
        @Inject(INGREDIENT_REPOSITORY)
        private readonly ingredientRepository: IngredientRepository,
        private readonly exceptionsService: ExceptionsService,
    ) {

    }

    async createCocktail(cocktailDto: CocktailDto): Promise<CocktailModel> {        

        await this.validateIngredients(cocktailDto.ingredients);

        const model = this.cocktailRepository.convertDtoToModel(cocktailDto);
        const operation = await this.cocktailRepository.createCocktail(model);
        return operation;
    }

    async updateCocktail(cocktailId: number, cocktailDto: CocktailDto): Promise<boolean> {
        const model = this.cocktailRepository.convertDtoToModel(cocktailDto);
        const operation = await this.cocktailRepository.updateCocktail(cocktailId, model);
        if(!operation){
            this.exceptionsService.badRequestException({message: 'Invalid: No fue posible actualizar el registro'});
        }
        return operation;
    }

    async deleteCocktail(cocktailId: number): Promise<boolean> {
        const operation = await this.cocktailRepository.deleteCocktail(cocktailId);
        return operation;
    }

    async readAllCocktails(): Promise<CocktailModel[]> {
        const operation = await this.cocktailRepository.readAllCocktails();
        return operation;
    }

    async readCocktailsByName(name: string): Promise<CocktailsModule[]> {
        return await this.cocktailRepository.readCocktailsByName(name);
    }

    async readCocktailsByIngredient(ingredienteName: string): Promise<CocktailsModule[]> {
        return await this.cocktailRepository.readCocktailsByIngredient(ingredienteName);
    }

    async readCocktailsByIngredientQuantity(ingredientQuantity: number): Promise<CocktailsModule[]> {
        return await this.cocktailRepository.readCocktailsByIngredientQuantity(ingredientQuantity);
    }

    async readCocktailById(cocktailId: number): Promise<CocktailModel> {
        const operation = await this.cocktailRepository.readCocktailById(cocktailId);
        return operation;
    }

    async validateIngredients(ingredients) {
        for (const ingredient of ingredients) {
            const ingredientExist = await this.ingredientRepository.readIngredientById(ingredient);
            if(!ingredientExist) {
                await this.exceptionsService.badRequestException({message: 'Invalid: Uno de los ingredientes no existe'});
            }
        }
    }
    
}