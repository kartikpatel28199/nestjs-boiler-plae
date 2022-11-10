import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { TypeORMError } from 'typeorm';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);
  catch(exception: any, host: ArgumentsHost) {
    this.logger.log({ LOG_ENTER: 'GlobalExceptionFilter()' });
    this.logger.log({ error: exception });
    console.log(exception);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    let statusCode = HttpStatus.INTERNAL_SERVER_ERROR,
      message = 'Internal Server Error',
      error = exception;

    statusCode = exception?.status || HttpStatus.INTERNAL_SERVER_ERROR;
    if (exception instanceof TypeORMError) {
      message = 'Internal Server Error';
      error = 'A database error has occurred';
    } else {
      message = exception?.message || 'Internal Server Error';
      error = exception?.response?.message || exception?.message;
    }
    this.logger.log({ LOG_EXIT: 'GlobalExceptionFilter()' });
    response.status(statusCode).json({
      status_code: statusCode,
      message: message,
      error: error,
    });
  }
}
