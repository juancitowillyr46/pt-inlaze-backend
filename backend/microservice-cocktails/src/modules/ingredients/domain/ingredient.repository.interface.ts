
import { IngredientDto } from "../application/ingrediente.dto";
import { IngredientEntity } from "./ingredient.entity";
import { IngredientModel } from "./ingredient.mode";

export const INGREDIENT_REPOSITORY = Symbol('IngredientRepository');

export interface IngredientRepository {
    createIngredient(ingredientModel: IngredientModel): Promise<IngredientModel>;
    updateIngredient(ingredientId: number, ingredientModel: IngredientModel): Promise<boolean>;
    deleteIngredient(ingredientId: number): Promise<boolean>;
    readAllIngredients(): Promise<IngredientModel[]>;
    readIngredientById(ingredientId: number): Promise<IngredientModel>;

    // Common
    toModel(data: IngredientEntity): IngredientModel;
    toEntity(data: IngredientModel): IngredientEntity;
    convertDtoToModel(data: IngredientDto): IngredientModel;
}
