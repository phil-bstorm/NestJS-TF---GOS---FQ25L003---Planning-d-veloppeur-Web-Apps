import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { Session } from 'src/shared/interfaces/session.interface';

@Injectable()
export class ConnectedGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request & { session: Session } = context.switchToHttp().getRequest();
    const session = request.session;

    if (!session) {
      // Si l'utilisateur n'est pas connecté (pas de session), on refuse l'accès
      return false;
    }

    return true;
  }
}
