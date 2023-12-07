import { SetMetadata } from '@nestjs/common';

export type IsPriorityEnough = (currentPriority: number) => boolean;
export const PRIORITY_KEY = 'user_priority';
export const UserPriorityCMDec = (func: IsPriorityEnough) => SetMetadata(PRIORITY_KEY, func);
export const UserLoginCMDec = () => SetMetadata(PRIORITY_KEY, prt => prt > 0);
