import type { UserSmall } from '@/shared/types';

export type LastMessage = {
	user: UserSmall;
	time: string;
	content: string;
};

export type Chat = {
	id: number;
	title: string;
	avatar: string;
	unread_count: number;
	last_message: LastMessage;
};
