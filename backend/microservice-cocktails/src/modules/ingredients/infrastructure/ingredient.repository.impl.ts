import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { IngredientEntity } from "src/modules/ingredients/domain/ingredient.entity";
import { IngredientModel } from "src/modules/ingredients/domain/ingredient.mode";
import { IngredientRepository } from "src/modules/ingredients/domain/ingredient.repository.interface";
import { Repository } from "typeorm";
import { IngredientDto } from "../application/ingrediente.dto";
import { BaseRepository } from "src/config/abstracts/base.repository.abstract";

@Injectable()
export class IngredientRepositoryImpl extends BaseRepository<IngredientEntity, IngredientModel> implements IngredientRepository {

    constructor(
        @InjectRepository(IngredientEntity)
        private readonly ingredientRepository: Repository<IngredientEntity>,
    ) {
        super()
    }

    async createIngredient(ingredientModel: IngredientModel): Promise<IngredientModel> {
        const entity = this.toEntity(ingredientModel);
        const command = await this.ingredientRepository.save(entity);
        return this.toModel(command as IngredientEntity);
    }

    async updateIngredient(ingredientId: number, ingredientModel: IngredientModel): Promise<boolean> {

        let commandFind = await this.findIngredientById(ingredientId);

        if(commandFind) {
            const entity = this.toEntity(ingredientModel);
            const commandUpd = await this.ingredientRepository.update({
                id: ingredientId
            }, entity);
            commandFind = (commandUpd.affected > 0);
        }
        
        return commandFind;
    }

    async deleteIngredient(ingredientId: number): Promise<boolean> {

        let commandFind = await this.findIngredientById(ingredientId);

        if(commandFind) {
            const commandUpd = await this.ingredientRepository.update({
                id: ingredientId
            }, {
                isDeleted : true,
                updatedAt: new Date()
            });
            commandFind = (commandUpd.affected > 0);
        }

        return commandFind;
    }

    async readIngredientById(ingredientId: number): Promise<IngredientModel | null> {
        const commmandFind = await this.ingredientRepository.findOne({
            where: { id : ingredientId }
        });
        return (commmandFind)? this.toModel(commmandFind) : commmandFind;
    }

    async findIngredientById(ingredientId: number): Promise<boolean>  {
        const commmandFind = await this.ingredientRepository.findOne({
            where: { id : ingredientId }
        });
        return (commmandFind)? true : false;
    }

    async readAllIngredients(): Promise<IngredientModel[]> {

        let ingredients: IngredientEntity[] = await this.ingredientRepository.findBy({
            isDeleted: false
        });
        
        let ingredientModels: IngredientModel[] = [];
        ingredients.forEach(ingredient => {
            ingredientModels.push(this.toModel(ingredient))
        });
        
        return ingredientModels;
    }

    toModel(data: IngredientEntity): IngredientModel {
        const model = new IngredientModel()
        model.id = data.id;
        model.name = data.name;
        return model;
    }

    toEntity(data: IngredientModel): IngredientEntity {
        const entity = new IngredientEntity();
        entity.id = data.id;
        entity.name = data.name;
        entity.createdAt = new Date();
        entity.updatedAt = null;
        entity.isDeleted = false;
        return entity;
    }

    convertDtoToModel(ingredientDto: IngredientDto) {
        const model = new IngredientModel();
        model.id = ingredientDto.id;
        model.name = ingredientDto.name;
        return model;
    }
  
}