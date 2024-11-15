import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { FastifyRequest } from 'fastify';
import { UserPayload } from '../interfaces/guards.interface';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<FastifyRequest>();
    const id = +(request.params as { userId: number }).userId;
    const user: UserPayload = request['user'];
    if (user.sub !== id) {
      throw new ForbiddenException();
    }
    return true;
  }
}
