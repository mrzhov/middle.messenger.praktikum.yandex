import type { Chat, ChatWithUsers, User } from '@/shared/types';

import type { Store } from './Store';

export type StoreState = {
	authUser?: Nullable<User>;
	chats?: Nullable<Array<Chat>>;
	currentChat?: Nullable<ChatWithUsers>;
};

export type StoreEvents = Values<typeof Store.EVENTS>;
export type StoreSubscribers = Record<string, (state: StoreState) => void>;
