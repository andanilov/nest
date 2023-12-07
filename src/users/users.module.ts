import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { Users } from './users';
import { UsersService } from './users.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthenticationGuard } from 'src/oauth/authentication.guard';
import { AuthorizationGuard } from 'src/oauth/authorization.guard';
import { OauthService } from 'src/oauth/oauth.service';
import { Oauth } from 'src/oauth/oauth';

@Module({
  controllers: [
    UsersController
  ],
  providers: [
    { provide: APP_GUARD, useClass: AuthenticationGuard },
    { provide: APP_GUARD, useClass: AuthorizationGuard },
    Users,
    UsersService,
    OauthService,
    Oauth,
  ],
})
export class UsersModule {}
