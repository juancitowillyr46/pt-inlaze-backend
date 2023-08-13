import { Catch, RpcExceptionFilter, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import { TcpEventException } from 'src/infrastructure/exceptions/tcp-exception.service';

@Catch() // Captura todas las excepciones
export class TcpEventExceptionFilter implements RpcExceptionFilter<RpcException> {
  catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
    // Verifica si la excepción es específica de eventos por TCP
    if (exception instanceof TcpEventException) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();

      response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        message: exception.message,
      }); 
    }

    // Propaga otras excepciones
    return throwError(() => exception);
  }
}