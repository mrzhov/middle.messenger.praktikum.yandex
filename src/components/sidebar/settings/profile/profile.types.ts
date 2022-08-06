import type { User } from '@/shared/types';

export type ProfileState = {
	authUser: Omit<User, 'display_name'>;
};
