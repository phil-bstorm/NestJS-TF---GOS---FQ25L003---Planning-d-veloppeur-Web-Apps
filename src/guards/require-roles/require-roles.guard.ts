import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { UserRole } from 'src/shared/enums/user-role.enum';
import { Session } from 'src/shared/interfaces/session.interface';

// nest g guard guards/require-roles/require-roles

@Injectable()
export class RequireRolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    // Récupere le décorateur @RequireRoles et ses parametres
    const roles = this.reflector.get<UserRole[]>('require-roles', context.getHandler());

    // Récupere la requete (avec la session)
    const request: Request & { session: Session } = context.switchToHttp().getRequest();
    const session = request.session;

    if (!session) {
      // Si l'utilisateur n'est pas connecté (pas de session), on refuse l'accès
      return false;
    }

    return roles.includes(session.role);
  }
}
