import { HttpClient } from '@/shared/core';

export class ChatApi {
	private http: HttpClient;

	constructor() {
		this.http = new HttpClient();
	}

	getChats<T>(): Promise<T> {
		return this.http.get<T>('/chats');
	}
}
