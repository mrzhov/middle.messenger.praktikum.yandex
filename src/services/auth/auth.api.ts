import { HttpClient } from '@/shared/core';
import type { LoginBody, RegistryBody } from '@/shared/types';

export class AuthApi {
	private http: HttpClient;

	constructor() {
		this.http = new HttpClient();
	}

	getUserInfo<T>(): Promise<T> {
		return this.http.get<T>('/auth/user');
	}

	login<T>(data: LoginBody): Promise<T> {
		return this.http.post<T>('/auth/signin', data);
	}

	registry<T>(data: RegistryBody): Promise<T> {
		return this.http.post<T>('/auth/signup', data);
	}

	logout<T>(): Promise<T> {
		return this.http.post<T>('/auth/logout');
	}
}
