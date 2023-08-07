import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CocktailEntity } from "../domain/cocktail.entity";
import { CocktailModel } from "../domain/cocktail.mode";
import { CocktailRepository } from "../domain/cocktail.repository.interface";
import { CocktailDto } from "../application/cocktail.dto";
import { BaseRepository } from "src/config/abstracts/base.repository.abstract";

@Injectable()
export class CocktailRepositoryImpl extends BaseRepository<CocktailEntity, CocktailModel> implements CocktailRepository {

    constructor(
        @InjectRepository(CocktailEntity)
        private readonly cocktailRepository: Repository<CocktailEntity>
    ) {
        super()
    }

    async createCocktail(cocktailModel: CocktailModel): Promise<CocktailModel> {
        const entity = this.toEntity(cocktailModel);
        const command = await this.cocktailRepository.save(entity);
        return this.toModel(command as CocktailEntity);
    }

    async updateCocktail(cocktailId: number, cocktailModel: CocktailModel): Promise<boolean> {

        let commandFind = await this.findCocktailById(cocktailId);

        if(commandFind) {
            const entity = this.toEntity(cocktailModel);
            const commandUpd = await this.cocktailRepository.update({
                id: cocktailId
            }, entity);
            commandFind = (commandUpd.affected > 0);
        }
        
        return commandFind;
    }

    async deleteCocktail(cocktailId: number): Promise<boolean> {

        let commandFind = await this.findCocktailById(cocktailId);

        if(commandFind) {
            const commandUpd = await this.cocktailRepository.update({
                id: cocktailId
            }, {
                isDeleted : true,
                updatedAt: new Date()
            });
            commandFind = (commandUpd.affected > 0);
        }

        return commandFind;
    }

    async readCocktailById(cocktailId: number): Promise<CocktailModel> {
        const commmandFind = await this.cocktailRepository.findOne({
            where: { id : cocktailId }
        });
        return this.toModel(commmandFind);
    }

    async findCocktailById(cocktailId: number): Promise<boolean>  {
        const commmandFind = await this.cocktailRepository.findOne({
            where: { id : cocktailId }
        });
        return (commmandFind)? true : false;
    }

    async readAllCocktails(): Promise<CocktailModel[]> {

        let cocktails: CocktailEntity[] = await this.cocktailRepository.findBy({
            isDeleted: false
        });
        
        let cocktailModels: CocktailModel[] = [];
        cocktails.forEach(cocktail => {
            cocktailModels.push(this.toModel(cocktail))
        });
        
        return cocktailModels;
    }

    async readCocktailsByName(name: string): Promise<CocktailModel[]> {

        let cocktails: CocktailEntity[] = await this.cocktailRepository.findBy({
            name: name
        });
        
        const cocktailModels = this.toModelsCollection(cocktails);
        return cocktailModels;
    }

    async readCocktailsByIngredient(ingredientName: string): Promise<CocktailModel[]> {

        let cocktails: CocktailEntity[] = await this.cocktailRepository
                                                                    .createQueryBuilder('cocktail')
                                                                    .innerJoin('cocktail.ingredients', 'ingredient')
                                                                    .where('ingredient.name = :name', { name: ingredientName })
                                                                    .getMany();


        const cocktailModels = this.toModelsCollection(cocktails);
        return cocktailModels;
    }

    async readCocktailsByIngredientQuantity(ingredientQuantity: number): Promise<CocktailModel[]> {

        let cocktails: CocktailEntity[] = await this.cocktailRepository
                                                                    .createQueryBuilder('cocktail')
                                                                    .leftJoin('cocktail.ingredients', 'ingredient')
                                                                    .groupBy('cocktail.id')
                                                                    .having('COUNT(ingredient.id) = :quantity', { quantity: ingredientQuantity })
                                                                    .getMany();
        
        const cocktailModels = this.toModelsCollection(cocktails);
        return cocktailModels;
    }

    toModel(data: CocktailEntity): CocktailModel {
        const model = new CocktailModel()
        model.id = data.id;
        model.name = data.name;
        model.instructions = data.instructions;
        model.additionalNotes = data.additionalNotes;
        return model;
    }

    toEntity(data: CocktailModel): CocktailEntity {
        const entity = new CocktailEntity();
        entity.id = data.id;
        entity.name = data.name;
        entity.instructions = data.instructions;
        entity.additionalNotes = data.additionalNotes;
        entity.createdAt = new Date();
        entity.updatedAt = null;
        entity.isDeleted = false;
        return entity;
    }

    convertDtoToModel(cocktailDto: CocktailDto) {
        const model = new CocktailModel();
        model.id = cocktailDto.id;
        model.name = cocktailDto.name;
        model.instructions = cocktailDto.instructions;
        model.additionalNotes = cocktailDto.additionalNotes;
        model.ingredients = cocktailDto.ingredients;
        return model;
    }

    toModelsCollection(cocktails: CocktailEntity[]): CocktailModel[] {
        let cocktailModels: CocktailModel[] = [];
        cocktails.forEach(cocktail => {
            cocktailModels.push(this.toModel(cocktail));
        });
        return cocktailModels;
    }
  
}