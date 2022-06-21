import type { ChatListItemType } from '@/shared/types';

export type ChatListItemProps = Omit<ChatListItemType, 'lastMessage'> & {
	lastMessageText: string;
	lastMessageTime: string;
};
