import { HttpClient } from '@/shared/services';
import type { LoginBody, RegistryBody } from '@/shared/types';

export class AuthApi {
	private http: HttpClient;

	constructor() {
		this.http = new HttpClient();
	}

	getUserInfo<T>(): Promise<T> {
		return this.http.get<T>('/auth/user');
	}

	login(data: LoginBody): Promise<unknown> {
		return this.http.post('/auth/signin', data);
	}

	registry(data: RegistryBody): Promise<unknown> {
		return this.http.post('/auth/signup', data);
	}

	logout(): Promise<unknown> {
		return this.http.post('/auth/logout');
	}
}
