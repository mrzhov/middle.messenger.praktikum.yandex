import type { UserInfo } from '@/shared/types';

export type ProfileData = Omit<UserInfo, 'id' | 'avatar'>;
