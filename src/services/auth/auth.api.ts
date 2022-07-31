import { HttpClient } from '@/shared/services';
import type { LoginBody } from '@/shared/types';

export class AuthApi {
	private http: HttpClient;

	constructor() {
		this.http = new HttpClient();
	}

	login(data: LoginBody): Promise<unknown> {
		return this.http.post('/auth/login', data);
	}

	// logout(): Promise<AxiosResponse<string>> {
	// 	return this.http.post<string>('/auth/logout');
	// }
}
