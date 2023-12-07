//
// -- Authentication Guard
//
// The guard adds user information if token exists and valid 
//

import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Users } from 'src/users/users';
import { Oauth } from './oauth';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private usersProvider: Users,
    private oauthProvider: Oauth,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // -- Skip for routes marked: isAuthenticationOff
    const isAuthenticationOff = this.reflector.get('isAuthenticationOff', context.getHandler());
    if (!!isAuthenticationOff) return true;

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);  

    if (!token) return true;
    request['token'] = token;    

    try {    
      // 1. Check JWT token and get user id from the token
      const { id } = await this.jwtService.verifyAsync(token, { secret: this.configService.get<string>('JWT_SECRET') });      
      if (!id) return true;

      // 2. Check if the token exists in the database
      // const oauth = await this.oauthProvider.get({ token, userId: id });
      // if (!oauth) return true;

      // 3. Set user information to Request
      // request['user'] = await this.usersProvider.getUser({ id });
      // if (!request['user']) return true;
      request['user'] = { id: 123, email: 'test@test.com', roles: { name: 'Client' } };
    } catch (err) {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];   
    return type === 'Bearer' ? token : undefined; 
  }
}
