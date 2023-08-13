import { Catch, RpcExceptionFilter, ArgumentsHost, HttpStatus } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import { TcpEventException } from 'src/infraestructure/exceptions/tcp-exception.service';

@Catch() // Captura todas las excepciones
export class TcpEventExceptionFilter implements RpcExceptionFilter<RpcException> {
  catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
    // Verifica si la excepción es específica de eventos por TCP
    if (exception instanceof TcpEventException) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse();

      // Maneja la excepción del evento por TCP aquí
      // response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      //   statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      //   message: 'Error en el evento emitido por TCP',
      // });
      // response.status(HttpStatus.BAD_REQUEST).json({
      //   statusCode: HttpStatus.BAD_REQUEST,
      //   message: exception.message,
      // }); 
    }

    // Propaga otras excepciones
    return throwError(() => exception);
  }
}