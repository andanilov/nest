import { Exclude, Expose } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";
import { Dto } from "./dto";
import { UserDto } from "./user.dto";

@Exclude()
export class OauthLoginDto extends Dto {
  @Expose() @IsNotEmpty() @IsString() accessToken: string;
  @Expose() @IsNotEmpty() @IsString() refreshToken: string;

  // @Expose() user = UserDto;
};
