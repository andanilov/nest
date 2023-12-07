import { Exclude } from "class-transformer";

@Exclude()
export class Dto {
  build?(data?: Record<string, any>) {
    for (const key of Object.keys(this))
      data?.[key] !== undefined && (this[key] = data[key]);
    return this;
  }
};
