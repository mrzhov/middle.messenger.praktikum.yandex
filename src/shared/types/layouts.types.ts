export type TitleAndPageId = {
	pageId?: string;
	title?: string;
};

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

export type Profile = {
	first_name: string;
	second_name: string;
	phone: string;
	email: string;
	login: string;
};
