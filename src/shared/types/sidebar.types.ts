export type ChatListItem = {
	id: string;
	name: string;
	unreadCount?: string;
	selected?: boolean;
	lastMessage: {
		text: string;
		time: string;
	};
};

export type PropsWithPageId = {
	pageId?: string;
};
