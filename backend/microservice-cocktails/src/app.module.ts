import { Module } from '@nestjs/common';
import { TypeOrmConfigModule } from './infraestructure/config/typeorm/typeorm.module';
import { BcryptModule } from './infraestructure/services/bycript/bycript.module';
import { ExceptionsModule } from './infraestructure/exceptions/exceptions.module';
import { EnvironmentConfigModule } from './infraestructure/config/environment-config/environment-config.module';
import { JwtStrategy } from './common/strategies/jwt.strategy';
import { CocktailsModule } from './modules/cocktails/cocktails.module';
import { IngredientsModule } from './modules/ingredients/ingredients.module';

@Module({
  imports: [
    TypeOrmConfigModule,
    EnvironmentConfigModule,
    BcryptModule,
    ExceptionsModule,
    
    CocktailsModule,
    IngredientsModule
  ],
  controllers: [],
  providers: [JwtStrategy],
})
export class AppModule {}
