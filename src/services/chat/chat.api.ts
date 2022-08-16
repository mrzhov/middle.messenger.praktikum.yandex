import { HttpClient } from '@/shared/core';
import type { ChatId, ChatTitle, ChatUsersBody } from '@/shared/types';

export class ChatApi {
	private http: HttpClient;

	constructor() {
		this.http = new HttpClient();
	}

	getChats<T>(): Promise<T> {
		return this.http.get<T>('/chats');
	}

	createChat<T>(data: ChatTitle): Promise<T> {
		return this.http.post<T>('/chats', data);
	}

	deleteChat<T>(data: ChatId): Promise<T> {
		return this.http.delete<T>('/chats', data);
	}

	getChatUsers<T>(id: string): Promise<T> {
		return this.http.get<T>(`/chats/${id}/users`);
	}

	changeAvatar<T>(data: FormData): Promise<T> {
		return this.http.put<T>('/chats/avatar', data, {
			headers: { accept: 'application/json' },
		});
	}

	addChatUsers<T>(data: ChatUsersBody): Promise<T> {
		return this.http.put<T>(`/chats/users`, data);
	}

	deleteChatUsers<T>(data: ChatUsersBody): Promise<T> {
		return this.http.delete<T>(`/chats/users`, data);
	}

	getChatToken<T>(id: string): Promise<T> {
		return this.http.post<T>(`/chats/token/${id}`);
	}
}
