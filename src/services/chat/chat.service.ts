import { store } from '@/app';
import type { Chat, ChatId, ChatTitle, ChatUsersBody, ChatWithUsers, User } from '@/shared/types';
import { changeRoute, errorHandler, getDialogChatTitle, openToast } from '@/shared/utils';

import { ChatApi } from './chat.api';

export class ChatService {
	private chatApi: ChatApi;

	constructor() {
		this.chatApi = new ChatApi();
		this.getChats = errorHandler(this.getChats.bind(this));
		this.createChat = errorHandler(this.createChat.bind(this));
		this.getChatUsers = errorHandler(this.getChatUsers.bind(this));
		this.changeAvatar = errorHandler(this.changeAvatar.bind(this));
	}

	async getChats(): Promise<Array<Chat>> {
		const chats = await this.chatApi.getChats<Array<Chat>>();
		return chats;
	}

	async getAndSetChats(): Promise<void> {
		const chats = await this.getChats();
		store.setState({
			chats,
		});
	}

	async createChat(data: ChatTitle): Promise<{ id: number }> {
		const response = await this.chatApi.createChat<{ id: number }>(data);
		await this.getAndSetChats();
		return response;
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

	async changeAvatar(data: FormData): Promise<void> {
		const { currentChat: currentChatFromStore } = store.getState();
		if (currentChatFromStore) {
			data.append('chatId', String(currentChatFromStore.id));
			const currentChat = await this.chatApi.changeAvatar<Chat>(data);
			const users = await this.getChatUsers(String(currentChat.id));
			store.setState({
				currentChat: {
					...currentChat,
					users,
				},
			});
		}
	}

	async addChatUsers(data: ChatUsersBody): Promise<void> {
		await this.chatApi.addChatUsers(data);
	}

	async deleteChatUsers(data: ChatUsersBody): Promise<void> {
		await this.chatApi.deleteChatUsers(data);
	}

	async isDialogChat(currentChat: ChatWithUsers): Promise<boolean> {
		if (currentChat.users.length === 2) {
			const [user1, user2] = currentChat.users;
			const dialogChatTitle = getDialogChatTitle(user1, user2);
			const dialogChatTitleWithReversedUsers = getDialogChatTitle(user2, user1);
			return (
				currentChat.title === dialogChatTitle ||
				currentChat.title === dialogChatTitleWithReversedUsers
			);
		}
		return false;
	}

	async deleteChat(data: ChatId): Promise<void> {
		await this.chatApi.deleteChat(data);
		await this.getAndSetChats();
	}

	async updateChatsAndCurrentChat(id: string): Promise<void> {
		const { chats } = store.getState();
		if (!chats) {
			await this.getAndSetChats();
		}
		if (id) {
			await this.getCurrentChat(id);
		}
	}

	async getChatToken(id: string): Promise<string> {
		const { token } = await this.chatApi.getChatToken<{ token: string }>(id);
		return token;
	}
}