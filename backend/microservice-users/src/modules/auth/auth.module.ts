import { Module } from "@nestjs/common";
import { UsersModule } from "../users/users.module";
import { AuthController } from "./infrastructure/controllers/auth.controller";
import { AuthService } from "./application/services/auth.service";
import { BcryptService } from "src/infraestructure/services/bycript/bcrypt.service";
import { ExceptionsModule } from "src/infraestructure/exceptions/exceptions.module";
import { ExceptionsService } from "src/infraestructure/exceptions/exceptions.service";
import { BcryptModule } from "src/infraestructure/services/bycript/bycript.module";

@Module({
  imports: [
    UsersModule,
    ExceptionsModule,
    BcryptModule
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    //BcryptService,
    //ExceptionsService
  ]
})
export class AuthModule {}
