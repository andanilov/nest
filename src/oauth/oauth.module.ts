import { Module } from '@nestjs/common';
import { OauthController } from './oauth.controller';
import { OauthService } from './oauth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [OauthController],
  providers: [OauthService],
  imports: [JwtModule.register({ global: true })],
  exports: [OauthService],
})
export class OauthModule {}
