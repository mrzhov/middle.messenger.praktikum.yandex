import type { StoreState } from '@/shared/core/store/Store.types';

export const storeInitialState: StoreState = {
	authUser: null,
	chats: null,
	currentChat: null,
	messageService: null,
	messages: null,
};
