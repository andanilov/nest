import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { UserRolesCMDec } from 'src/oauth/user.roles.decorator';
import { Role } from 'src/oauth/role.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  // @HttpCode(HttpStatus.UNAUTHORIZED)
  @UserRolesCMDec(Role.Client)
  async me() {
    return { msg: 'OK' };
    // return await this.usersService.getMyself();
  }
}
