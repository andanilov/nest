import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {};

  @Get('me')
  @HttpCode(HttpStatus.OK)
  async me() {
    return await this.usersService.getMyself();
  };


}
