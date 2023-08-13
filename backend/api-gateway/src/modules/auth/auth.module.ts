import { Module } from "@nestjs/common";
import { AuthService } from "./application/auth.service";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { MICROSERVICE_USERS } from "src/infrastructure/config/constants/microservices-tokens.constant";
import { ExceptionsModule } from "src/infrastructure/exceptions/exceptions.module";
import { AuthController } from "./infrastructure/auth.controller";

@Module({
  imports: [
    ClientsModule.register([
      {
        name: MICROSERVICE_USERS,
        transport: Transport.TCP,
        options: {
          port: 3001
        },
      }
    ]),
    ExceptionsModule
  ],
  controllers: [
    AuthController
  ],
  providers: [
    AuthService
  ],
  exports: [
  ]
})
export class AuthModule {}
