import { Injectable } from '@nestjs/common';
// import { oauths } from '@prisma/client';
// import { DatabaseService } from 'src/database/database.service';

// interface IOauthWhereOptionsList {

// }

@Injectable()
export class Oauth {
  // constructor(private readonly databaseService: DatabaseService) {}
  constructor() {}

  async update() {
    return;
  }
  async set() {
    return;
  }
  async getByRefresh() {
    return;
  }
  async get() {
    return;
  }
  async remove() {
    return;
  }


  // async set(data: Omit<oauths,'idOauth'>): Promise<oauths> {
  //   return this.databaseService.oauths.create({ data });
  // }

  // async update(oauth: oauths) {
  //   const { idOauth, ...data } = oauth;
  //   return this.databaseService.oauths.update({
  //     where: { idOauth },
  //     data,
  //   });
  // }

  // async getByRefresh(refresh): Promise<oauths|null> {
  //   return await this.databaseService.oauths.findFirst({ where: { refresh } });
  // }

  // async get(where: Partial<oauths>, first = true): Promise<oauths|oauths[]|undefined> {
  //   return first
  //     ? this.databaseService.oauths.findFirst({ where })
  //     : this.databaseService.oauths.findMany({ where });
  // }

  // async remove(where: Partial<oauths>) {    
  //   return this.databaseService.oauths.deleteMany({ where })
  // }

};

