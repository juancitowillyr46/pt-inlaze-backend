import { Inject, Injectable } from "@nestjs/common";
import { ExceptionsService } from "src/infraestructure/exceptions/exceptions.service";
import { INGREDIENT_REPOSITORY, IngredientRepository } from "../domain/ingredient.repository.interface";
import { IngredientDto } from "./ingrediente.dto";
import { IngredientModel } from "../domain/ingredient.mode";

@Injectable()
export class IngredientService {

    constructor(
        @Inject(INGREDIENT_REPOSITORY)
        private readonly ingredientRepository: IngredientRepository,
        private readonly exceptionsService: ExceptionsService,
    ) {

    }

    async createIngredient(ingredientDto: IngredientDto): Promise<IngredientModel> {        
        const model = this.ingredientRepository.convertDtoToModel(ingredientDto);
        const operation = await this.ingredientRepository.createIngredient(model);
        return operation;
    }

    async updateIngredient(ingredientId: number, ingredientDto: IngredientDto): Promise<boolean> {
        const model = this.ingredientRepository.convertDtoToModel(ingredientDto);
        const operation = await this.ingredientRepository.updateIngredient(ingredientId, model);
        if(!operation){
            this.exceptionsService.badRequestException({message: 'Invalid: No fue posible actualizar el registro'});
        }
        return operation;
    }

    async deleteIngredient(ingredientId: number): Promise<boolean> {
        const operation = await this.ingredientRepository.deleteIngredient(ingredientId);
        return operation;
    }

    async readAllIngredients(): Promise<IngredientModel[]> {
        const operation = await this.ingredientRepository.readAllIngredients();
        return operation;
    }

    async readIngredientById(ingredientId: number): Promise<IngredientModel> {
        const operation = await this.ingredientRepository.readIngredientById(ingredientId);
        return operation;
    }
    
}