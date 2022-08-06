import type { User } from '@/shared/types';

export type ProfileData = Omit<User, 'id' | 'avatar'>;
export type ChangePasswordData = {
	oldPassword: string;
	newPassword: string;
};
