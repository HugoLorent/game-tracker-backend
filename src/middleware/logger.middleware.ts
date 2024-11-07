import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger = new Logger(LoggerMiddleware.name);

  use(req: FastifyRequest, res: FastifyReply, next: () => void) {
    this.logger.log(`${req.method} ${req.originalUrl}`);
    next();
  }
}
