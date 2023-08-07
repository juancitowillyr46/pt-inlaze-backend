import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExceptionsModule } from 'src/infraestructure/exceptions/exceptions.module';
import { COCKTAIL_REPOSITORY } from './domain/cocktail.repository.interface';
import { CocktailRepositoryImpl } from './infrastructure/cocktail.repository.impl';
import { CocktailController } from './infrastructure/cocktail.controller';
import { CocktailService } from './application/cocktail.service';
import { CocktailEntity } from './domain/cocktail.entity';
import { IngredientsModule } from '../ingredients/ingredients.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CocktailEntity]),
    ExceptionsModule,
    IngredientsModule
  ],
  controllers: [CocktailController],
  providers: [
    {
      provide: COCKTAIL_REPOSITORY,
      useClass: CocktailRepositoryImpl,
    },
    CocktailService
  ],
  exports: [
    COCKTAIL_REPOSITORY
  ]
})
export class CocktailsModule {}
