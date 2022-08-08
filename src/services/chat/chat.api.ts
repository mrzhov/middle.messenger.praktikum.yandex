import { HttpClient } from '@/shared/core';
import type { ChatTitle } from '@/shared/types';

export class ChatApi {
	private http: HttpClient;

	constructor() {
		this.http = new HttpClient();
	}

	getChats<T>(): Promise<T> {
		return this.http.get<T>('/chats');
	}

	createChat(data: ChatTitle): Promise<unknown> {
		return this.http.post('/chats', data);
	}

	getChatUsers<T>(id: string): Promise<T> {
		return this.http.get<T>(`/chats/${id}/users`);
	}

	changeAvatar<T>(data: FormData): Promise<T> {
		return this.http.put<T>('/chats/avatar', data, {
			headers: { 'content-type': 'multipart/form-data' },
		});
	}
}
