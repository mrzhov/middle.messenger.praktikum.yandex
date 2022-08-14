export type WSSParams = {
	userId: number;
	chatId: string;
	token: string;
};

export type MessageItem = {
	chat_id: number;
	time: string;
	type: string;
	user_id: string;
	content: string;
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

export type MessageData = {
	message: string;
};
