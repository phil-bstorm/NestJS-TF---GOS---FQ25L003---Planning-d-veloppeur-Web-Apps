import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    console.log(`Request...`);
    console.log(`Method: ${req.method}`);
    console.log(`URL: ${req.baseUrl}`);
    next();
  }
}
