import type { UserSmall } from '@/shared/types';

export type LastMessage = {
	user: UserSmall;
	time: string;
	content: string;
};

export type Chat = {
	id: number;
	title: string;
	avatar: Nullable<string>;
	unread_count: number;
	last_message: Nullable<LastMessage>;
};

export type ChatTitle = {
	title: string;
};

export type AddChatUsersBody = {
	chatId: number;
	users: Array<number>;
};
