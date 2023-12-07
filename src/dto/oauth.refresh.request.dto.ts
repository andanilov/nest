import { Exclude, Expose } from "class-transformer";
import { IsString } from "class-validator";

@Exclude()
export class OauthRefreshRequestDto {
  @Expose() @IsString() refreshToken: string = '';
};
