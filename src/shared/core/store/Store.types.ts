import type { UserInfo } from '@/shared/types';

import type { Store } from './Store';

export type StoreState = {
	authUser?: Nullable<Omit<UserInfo, 'display_name'>>;
};

export type StoreEvents = Values<typeof Store.EVENTS>;
export type StoreSubscribers = Record<string, (state: StoreState) => void>;
