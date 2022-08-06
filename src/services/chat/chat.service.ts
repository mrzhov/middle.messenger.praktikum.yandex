import { store } from '@/app';
import type { Chat, ChatTitle } from '@/shared/types';
import { errorHandler } from '@/shared/utils';

import { ChatApi } from './chat.api';

export class ChatService {
	private chatApi: ChatApi;

	constructor() {
		this.chatApi = new ChatApi();
		this.getChats = errorHandler(this.getChats.bind(this));
	}

	async getChats(): Promise<Array<Chat>> {
		const chats = await this.chatApi.getChats<Array<Chat>>();
		store.setState({
			chats,
		});
		return chats;
	}

	async createChat(data: ChatTitle): Promise<void> {
		await this.chatApi.createChat(data);
		await this.getChats();
	}
}
