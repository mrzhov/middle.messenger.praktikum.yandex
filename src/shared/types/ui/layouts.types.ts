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

export type Profile = {
	first_name: string;
	second_name: string;
	phone: string;
	email: string;
	login: string;
};
