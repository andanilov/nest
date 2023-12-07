import { Body, Controller, HttpCode, Post, Request } from '@nestjs/common';
import { OauthService } from './oauth.service';
import { OauthLoginRequestDto } from 'src/dto/oauth.login.request.dto';
import { AuthenticationOff } from './authentication.off.decorator';
import { OauthRefreshRequestDto } from 'src/dto/oauth.refresh.request.dto';

@Controller('oauth')
export class OauthController {
  constructor(private authService: OauthService) {}

  @Post('login')
  async logIn(@Body() logIn: OauthLoginRequestDto, @Request() request) {
    return this.authService.logIn(logIn, request);
  }
    
  @Post('refresh')
  // @HttpCode(HttpStatus.OK)
  @AuthenticationOff() // - Switch off the global authentication guard
  async refresh(@Body() { refreshToken }: OauthRefreshRequestDto, @Request() request) {
    return this.authService.refresh(refreshToken, request);
  }
  
}
