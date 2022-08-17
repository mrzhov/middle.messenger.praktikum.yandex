import type { User, UserSmall } from '@/shared/types';

export type LastMessage = {
	user: UserSmall;
	time: string;
	content: string;
};

export type Chat = {
	id: number;
	title: string;
	avatar: Nullable<string>;
	created_by: number;
	unread_count: number;
	last_message: Nullable<LastMessage>;
};

export type ChatWithUsers = Chat & { users: Array<User> };

export type ChatTitle = {
	title: string;
};

export type ChatId = {
	chatId: number;
};

export type ChatUsersBody = {
	chatId: number;
	users: Array<number>;
};