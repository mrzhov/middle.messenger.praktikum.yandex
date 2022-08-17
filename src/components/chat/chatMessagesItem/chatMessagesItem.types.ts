import type { MessageItem, MessageItemSmall } from '@/shared/types';

export type ChatMessagesItemProps = {
	message: (MessageItem | MessageItemSmall) & { user_avatar: Nullable<string> };
};
