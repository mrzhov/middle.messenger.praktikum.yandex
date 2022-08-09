import { HttpClient } from '@/shared/core';
import type { ChangePasswordData, ProfileData } from '@/shared/types';

export class UserApi {
	private http: HttpClient;

	constructor() {
		this.http = new HttpClient();
	}

	changeProfile<T>(data: ProfileData): Promise<T> {
		return this.http.put<T>('/user/profile', data);
	}

	changePassword<T>(data: ChangePasswordData): Promise<T> {
		return this.http.put<T>('/user/password', data);
	}

	changeAvatar<T>(data: FormData): Promise<T> {
		return this.http.put<T>('/user/profile/avatar', data, {
			headers: { 'content-type': 'multipart/form-data' },
		});
	}

	searchUsers<T>(login: string): Promise<T> {
		return this.http.post<T>('/user/search', { login });
	}
}
