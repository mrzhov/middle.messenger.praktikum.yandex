import { HttpClient } from '@/shared/core';
import type { ChangePasswordData, ProfileData } from '@/shared/types';

export class AccountApi {
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
}
