import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IngredientEntity } from '../ingredients/domain/ingredient.entity';
import { INGREDIENT_REPOSITORY } from '../ingredients/domain/ingredient.repository.interface';
import { IngredientRepositoryImpl } from '../ingredients/infrastructure/ingredient.repository.impl';
import { ExceptionsModule } from 'src/infraestructure/exceptions/exceptions.module';
import { IngredientController } from './infrastructure/ingredient.controller';
import { IngredientService } from './application/ingredient.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([IngredientEntity]),
    ExceptionsModule
  ],
  controllers: [IngredientController],
  providers: [
    {
      provide: INGREDIENT_REPOSITORY,
      useClass: IngredientRepositoryImpl,
    },
    IngredientService
  ],
  exports: [
    INGREDIENT_REPOSITORY
  ]
})
export class IngredientsModule {}
