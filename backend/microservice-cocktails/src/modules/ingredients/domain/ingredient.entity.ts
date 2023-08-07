import { Column, Entity, ManyToMany, ManyToOne, OneToOne } from "typeorm";
import { AuditableEntity } from "src/common/entitites/auditable.entity";
import { CocktailEntity } from "src/modules/cocktails/domain/cocktail.entity";

@Entity({name: 'ingredients'})
export class IngredientEntity extends AuditableEntity {

    @Column('varchar', { length: 250 } )
    name: string;

    // @ManyToOne(() => CocktailEntity, cocktail => cocktail.ingredients)
    // cocktail: CocktailEntity;


    @ManyToMany(() => CocktailEntity, cocktail => cocktail.ingredients)
    cocktails: CocktailEntity[];

    // Relación OneToOne inversa con User
    // @OneToOne(() => UserEntity, (user) => user.ingredient)
    // user: UserEntity;


}