import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { IException, IFormatExceptionMessage } from "src/core/config/interfaces/exceptions/exceptions.interface";
import { TcpEventException } from "./tcp-exception.service";

  @Injectable()
  export class ExceptionsService implements IException {
    badRequestException(data: IFormatExceptionMessage): void {
      throw new BadRequestException(data);
    }
    internalServerErrorException(data?: IFormatExceptionMessage): void {
      throw new InternalServerErrorException(data);
    }
    forbiddenException(data?: IFormatExceptionMessage): void {
      throw new ForbiddenException(data);
    }
    unauthorizedException(data?: IFormatExceptionMessage): void {
      throw new UnauthorizedException(data);
    }
    eventPatternException(data?: IFormatExceptionMessage): void {
      throw new TcpEventException(data);
    }
  }
  