import { SetMetadata, CustomDecorator } from '@nestjs/common';

export const AuthenticationOff = (): CustomDecorator => SetMetadata('isAuthenticationOff', true);
