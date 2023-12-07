//
// -- Authorization Guard
//
// The guard checks if current user has permissions to get controller
// using user information from the Request (after the authentication guard)  
//

import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { Users } from 'src/users/users';
import { Reflector } from '@nestjs/core';
import { Role } from './role.enum';
import { ROLES_KEY } from './user.roles.decorator';
import { IsPriorityEnough, PRIORITY_KEY } from './user.priority.decorator';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private usersProvider: Users,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // 1. Check if roles list exists
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    // 2. Check if the access needs a priority
    const requiredPriority = this.reflector.getAllAndOverride<IsPriorityEnough>(PRIORITY_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles && !requiredPriority) return true;

    // 3. Get current user roles
    const { user } = context.switchToHttp().getRequest();
    if (!user) throw new UnauthorizedException();

    // 4. Check roles
    if (requiredRoles?.length && (!user?.roles?.length || !(user?.roles || []).some(({ name }) => requiredRoles?.includes(name))))
      throw new ForbiddenException();

    // 5. Check priority
    if (requiredPriority) {
      const maxUserPriority = (user?.roles?.length && Math.max(...user.roles.map(({ priority }) => Number(priority)))) || 0;
      if (!requiredPriority(maxUserPriority)) throw new ForbiddenException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];   
    return type === 'Bearer' ? token : undefined; 
  }
}
