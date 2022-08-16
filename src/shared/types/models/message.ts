import type { Resource } from '@/shared/types';

export type WSSParams = {
	userId: number;
	chatId: string;
	token: string;
};

export type MessageItem = {
	id: number;
	user_id: number;
	chat_id: number;
	type: string;
	time: string;
	content: string;
	is_read: boolean;
	file: Nullable<Resource>;
};

export type MessageItemSmall = Omit<MessageItem, 'chat_id' | 'is_read' | 'file'>;

export type MessageData = {
	message: string;
};
