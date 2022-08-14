import type { MessageService } from '@/services';
import type { Chat, ChatWithUsers, MessageItem, MessageItemSmall, User } from '@/shared/types';

import type { Store } from './Store';

export type StoreState = {
	authUser?: Nullable<User>;
	chats?: Nullable<Array<Chat>>;
	currentChat?: Nullable<ChatWithUsers>;
	messageService?: Nullable<MessageService>;
	messages?: Nullable<Array<MessageItem | MessageItemSmall>>;
};

export type StoreEvents = Values<typeof Store.EVENTS>;
export type StoreSubscribers = Record<string, (state: StoreState) => void>;
