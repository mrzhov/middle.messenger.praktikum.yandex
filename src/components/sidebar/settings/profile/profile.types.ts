import type { ProfileData } from '@/shared/types';

export type ProfileState = {
	authUser: Omit<ProfileData, 'display_name'>;
};
