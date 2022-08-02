import type { UserInfo } from '@/shared/types';

export type ProfileData = Omit<UserInfo, 'id' | 'avatar'>;
export type ChangePasswordData = {
	oldPassword: string;
	newPassword: string;
};
