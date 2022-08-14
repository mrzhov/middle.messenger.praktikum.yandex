export type WSSParams = {
	userId: number;
	chatId: string;
	token: string;
};

export type MessageItem = {
	id: number;
	user_id: number;
	chat_id: number;
	type: string;
	time: string;
	content: string;
	is_read: boolean;
	file?: {
		id: number;
		user_id: number;
		path: string;
		filename: string;
		content_type: string;
		content_size: number;
		upload_date: string;
	};
};

export type MessageItemSmall = Omit<MessageItem, 'chat_id' | 'is_read' | 'file'>;

export type MessageData = {
	message: string;
};
