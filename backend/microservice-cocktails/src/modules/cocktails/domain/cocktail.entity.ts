import { Column, Entity, JoinTable, ManyToMany, OneToMany, OneToOne } from "typeorm";
import { AuditableEntity } from "src/common/entitites/auditable.entity";
import { IngredientEntity } from "src/modules/ingredients/domain/ingredient.entity";

@Entity({name: 'cocktails'})
export class CocktailEntity extends AuditableEntity {

    @Column('varchar', { length: 250, name: 'name' } )
    name: string;

    @Column('varchar', { length: 250, name: 'instructions' } )
    instructions: string;

    @Column('varchar', { length: 250, name: 'additional_notes' } )
    additionalNotes: string;

    // Relación OneToOne inversa con User
    // @OneToMany(() => IngredientEntity, ingredient => ingredient.cocktail, { cascade: true })
    
    @ManyToMany(() => IngredientEntity, { cascade: true })
    @JoinTable(
            {
                name: 'cocktails_ingredients', 
                joinColumn: { name: 'cocktail_id', referencedColumnName: 'id' },
                inverseJoinColumn: { name: 'ingredient_id', referencedColumnName: 'id' }
            }
        )
    ingredients: IngredientEntity[];
}