import { Exclude, Expose } from "class-transformer";
import { IsBoolean, IsEmail, IsNotEmpty, IsString, IsUUID } from "class-validator";
// import { RoleDto } from "./role.dto";
import { Dto } from "./dto";

@Exclude()
export class UserDto extends Dto {
  @Expose() @IsNotEmpty() @IsUUID() id: string = '';
  @Expose() @IsNotEmpty() @IsUUID() email: string = '';
  @Expose() @IsString() first_name: string = '';
  @Expose() @IsString() last_name: string = '';
  @Expose() @IsString() company: string = '';
  @Expose() @IsString() phone: string = '';

  // @Expose() @IsNotEmpty() @IsUUID() id: string = '';
  // @Expose() @IsNotEmpty() @IsEmail() email: number = 0;
  // @Expose() @IsString() firstName: string = '';
  // @Expose() @IsString() lastName: string = '';
  // @Expose() @IsString() avatarURL: string = '';
  // @Expose() @IsString() phone: string = '';
  // @Expose() @IsBoolean() isActive: boolean = true;
  
  // @Expose() roles = RoleDto;
};
