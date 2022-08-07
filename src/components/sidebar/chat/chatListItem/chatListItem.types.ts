import type { Chat } from '@/shared/types';

export type ChatListItemProps = Omit<Chat, 'id'> & { itemId: number };
