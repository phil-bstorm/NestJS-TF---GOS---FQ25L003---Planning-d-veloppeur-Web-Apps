import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import {
  InvalidLoginException,
  NotFoundException,
  UsernameAlreadyExistsException,
} from 'src/shared/models/errors.model';

//nest g filter filters/http-exception

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response: Response = ctx.getResponse();

    console.log(exception);

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'Internal server error';

    if (exception instanceof NotFoundException) {
      status = HttpStatus.NOT_FOUND;
      message = exception.message;
    } else if (
      exception instanceof UsernameAlreadyExistsException ||
      exception instanceof InvalidLoginException
    ) {
      status = HttpStatus.BAD_REQUEST;
      message = exception.message;
    } else if (exception instanceof HttpException) {
      status = exception.getStatus();
      const res = exception.getResponse();
      message = typeof res === 'string' ? res : (res as Error).message || message;
    } else {
      // TODO envoyer a Sentry
      console.error(exception);
    }

    response.status(status).json({
      message,
    });
  }
}
