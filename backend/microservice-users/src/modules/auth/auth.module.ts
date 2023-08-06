import { Module } from "@nestjs/common";
import { UsersModule } from "../users/users.module";
import { AuthController } from "./infrastructure/controllers/auth.controller";
import { AuthService } from "./application/services/auth.service";
import { ExceptionsModule } from "src/infraestructure/exceptions/exceptions.module";
import { BcryptModule } from "src/infraestructure/services/bycript/bycript.module";
import { JwtModule } from "src/infraestructure/services/jwt/jwt.module";
import { EnvironmentConfigModule } from "src/infraestructure/config/environment-config/environment-config.module";

@Module({
  imports: [
    UsersModule,
    ExceptionsModule,
    BcryptModule,
    JwtModule,
    EnvironmentConfigModule
  ],
  controllers: [AuthController],
  providers: [
    AuthService
  ]
})
export class AuthModule {}
