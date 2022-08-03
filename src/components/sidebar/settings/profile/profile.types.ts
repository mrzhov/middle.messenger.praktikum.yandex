import type { UserInfo } from '@/shared/types';

export type ProfileState = {
	authUser: Omit<UserInfo, 'display_name'>;
};
