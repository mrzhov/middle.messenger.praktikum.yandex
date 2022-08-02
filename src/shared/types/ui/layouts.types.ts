export type Message = {
	author: string;
	text: string;
	time: string;
	read: string;
};

type SortedMessage = {
	date: string;
	messages: Array<Message>;
};

export type ChatListItemType = {
	id: string;
	name: string;
	unreadCount?: string;
	lastMessage: {
		text: string;
		time: string;
	};
	sortedMessages: Array<SortedMessage>;
};
