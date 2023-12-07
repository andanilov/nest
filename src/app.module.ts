import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { OauthModule } from './oauth/oauth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    OauthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
