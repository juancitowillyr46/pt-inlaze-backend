import { Module } from '@nestjs/common';
import { ExceptionsService } from './exceptions.service';
import { APP_FILTER } from '@nestjs/core';
import { TcpEventExceptionFilter } from 'src/common/filters/tcp-event.filter';

@Module({
  providers: [
    ExceptionsService,
    {
      provide: APP_FILTER,
      useClass: TcpEventExceptionFilter,
    },
  ],
  exports: [ExceptionsService],
})
export class ExceptionsModule {}
