import { store } from '@/app';
import type { Chat, ChatTitle, User } from '@/shared/types';
import { changeRoute, errorHandler, openToast } from '@/shared/utils';

import { ChatApi } from './chat.api';

export class ChatService {
	private chatApi: ChatApi;

	constructor() {
		this.chatApi = new ChatApi();
		this.getChats = errorHandler(this.getChats.bind(this));
		this.createChat = errorHandler(this.createChat.bind(this));
		this.getChatUsers = errorHandler(this.getChatUsers.bind(this));
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

	async getChatUsers(id: string): Promise<Array<User>> {
		const users = await this.chatApi.getChatUsers<Array<User>>(id);
		return users;
	}

	async getCurrentChat(id: string): Promise<void> {
		const { chats } = store.getState();
		if (chats) {
			const currentChat = chats.find(chat => String(chat.id) === id);
			if (!currentChat) {
				openToast('Указанного чата не существует!');
				changeRoute('/');
				return;
			}
			const users = await this.getChatUsers(id);
			store.setState({
				currentChat: {
					...currentChat,
					users,
				},
			});
		}
	}
}
