import type { ChatListItemType } from '@/shared/types';

export type ChatListItemProps = Omit<ChatListItemType, 'lastMessage' | 'sortedMessages'> & {
	lastMessageText: string;
	lastMessageTime: string;
};
