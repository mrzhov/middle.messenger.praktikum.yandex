export type ChatListItemType = {
	id: string;
	name: string;
	unreadCount?: string;
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
