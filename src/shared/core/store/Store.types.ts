import type { Chat, User } from '@/shared/types';

import type { Store } from './Store';

export type StoreState = {
	authUser?: Nullable<Omit<User, 'display_name'>>;
	chats?: Nullable<Array<Chat>>;
};

export type StoreEvents = Values<typeof Store.EVENTS>;
export type StoreSubscribers = Record<string, (state: StoreState) => void>;
