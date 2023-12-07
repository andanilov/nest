import { Injectable, PreconditionFailedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { OauthLoginDto } from 'src/dto/oauth.login.dto';

@Injectable()
export class OauthService {
  constructor(
    private configService: ConfigService,
    // private usersService: UsersService,
    private jwtService: JwtService,
    // private usersProvider: Users,
    // private oauthProvider: Oauth,
    // private msgService: MessagesService,
    // private mailService: MailService,
    // private emitService: EmitService,
  ) {}

  async logIn({ login, password }: { login: string, password: string }, request: Request): Promise<OauthLoginDto> {  
    // 1. Check if the user exists
    // const user = await this.usersService.getUserByEmail(login);   
    // if (!user || !(await compareHash(password, user?.password))) throw new UnauthorizedException(); 

    // 2. Generate pair access and refresh tokens
    const accessToken = await this.generateToken('1', 'ACCESS');
    const refreshToken = await this.generateToken('1', 'REFRESH');
    // const token = await this.generateToken(user.id, 'ACCESS');
    // const refresh = await this.generateToken(user.id, 'REFRESH');

    // const { ip, ua, os, browser } = getUserInfoByRequest(request);

    try {
      // 3. Set auth information
      // await this.oauthProvider.set({
      //   token,
      //   refresh,
      //   expires: new Date(+new Date().getTime() + getPeriodByString(this.configService.get<string>(`JWT_REFRESH_EXPIRED`)) / 60),
      //   ua,
      //   ip,
      //   userId: user.id,
      //   device: os?.name,
      //   model: browser?.name,
      // });

      // 4. Update user login information
      // await this.usersProvider.updateUser({
      //   id: user.id,
      //   lastIp: ip,
      //   lastUserAgent: ua,
      // });

      // this.emitService.emit('user.login', { user });
    } catch {
      throw new PreconditionFailedException();
    }

    return { accessToken, refreshToken };
  }

  async refresh(oldRefresh, request: any): Promise<OauthLoginDto> {
    // 1. Check refresh token
    // const { id } = await this.jwtService.verifyAsync(oldRefresh, { secret: this.configService.get<string>('JWT_SECRET') }); 
    // if (!id) throw new BadRequestException(); 
    
    // const { idOauth, userId } = (await this.oauthProvider.getByRefresh(oldRefresh)) || {};
    // if (!idOauth || userId !== id ) throw new BadRequestException();

    // 2. Generate pair access and refresh tokens
    const accessToken = await this.generateToken('1', 'ACCESS');
    const refreshToken = await this.generateToken('1', 'REFRESH');
    // const token = await this.generateToken(id, 'ACCESS');
    // const refresh = await this.generateToken(id, 'REFRESH');

    // const { ip, ua, os, browser } = getUserInfoByRequest(request);

    // try {
      // 3. Update auth information
    //   await this.oauthProvider.update({
    //     idOauth,
    //     token,
    //     refresh,
    //     expires: new Date(+new Date().getTime() + getPeriodByString(this.configService.get<string>(`JWT_REFRESH_EXPIRED`)) / 60),
    //     ua,
    //     ip,
    //     userId,
    //     device: os?.name,
    //     model: browser?.name,
    //   });

    //   // 4. Update user login information
    //   const updatedUser = await this.usersProvider.updateUser({
    //     id: userId,
    //     lastIp: ip,
    //     lastUserAgent: ua,
    //   });

    //   this.emitService.emit('user.refresh', { user: updatedUser });
    // } catch {
    //   throw new PreconditionFailedException();
    // }

    return { accessToken, refreshToken };
  }

  private async generateToken(id: string, type: 'REFRESH' | 'ACCESS') {
    return this.jwtService.signAsync(
      { id },
      { 
        secret: this.configService.get<string>('JWT_SECRET'),
        expiresIn: this.configService.get<string>(`JWT_${type}_EXPIRED`),
      }      
    );
  }
}
