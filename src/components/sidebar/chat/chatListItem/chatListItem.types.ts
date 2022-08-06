import type { Chat } from '@/shared/types';

export type ChatListItemProps = Omit<Chat, 'last_message'> & {
	lastMessageTime: string;
	lastMessageContent: string;
};
