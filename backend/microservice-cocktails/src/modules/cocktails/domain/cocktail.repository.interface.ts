import { CocktailDto } from "../application/cocktail.dto";
import { CocktailEntity } from "./cocktail.entity";
import { CocktailModel } from "./cocktail.mode";

export const COCKTAIL_REPOSITORY = Symbol('CocktailRepository');

export interface CocktailRepository {
    createCocktail(cocktailModel: CocktailModel): Promise<CocktailModel>;
    updateCocktail(cocktailId: number, cocktailModel: CocktailModel): Promise<boolean>;
    deleteCocktail(cocktailId: number): Promise<boolean>;
    readAllCocktails(): Promise<CocktailModel[]>;
    readCocktailsByName(name: string): Promise<CocktailModel[]>;
    readCocktailsByIngredient(ingredientName: string): Promise<CocktailModel[]>;
    readCocktailsByIngredientQuantity(ingredientQuantity: number): Promise<CocktailModel[]>;

    readCocktailById(cocktailId: number): Promise<CocktailModel>;

    // Common
    toModel(data: CocktailEntity): CocktailModel;
    toEntity(data: CocktailModel): CocktailEntity;
    convertDtoToModel(data: CocktailDto): CocktailModel;
}
