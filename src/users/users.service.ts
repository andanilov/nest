import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  constructor() {}

  async getMyself() {
    return { email: 'someEmail' };
  }
}
