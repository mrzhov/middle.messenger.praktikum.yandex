import { store } from '@/app';
import type { LoginBody, RegistryBody, UserInfo } from '@/shared/types';
import { LocalStorageKeys } from '@/shared/types';
import { changeRoute, errorHandler } from '@/shared/utils';

import { AuthApi } from './auth.api';

export class AuthService {
	private authApi: AuthApi;

	constructor() {
		this.authApi = new AuthApi();
		this.login = errorHandler(this.login.bind(this));
		this.registry = errorHandler(this.registry.bind(this));
		this.logout = errorHandler(this.logout.bind(this));
	}

	async getUserInfo(): Promise<UserInfo> {
		const authUser = await this.authApi.getUserInfo<UserInfo>();
		store.setState({
			authUser,
		});
		return authUser;
	}

	async login(data: LoginBody): Promise<void> {
		await this.authApi.login(data);
		changeRoute('/');
	}

	async registry(data: RegistryBody): Promise<void> {
		await this.authApi.registry(data);
		changeRoute('/');
	}

	async logout(): Promise<void> {
		await this.authApi.logout();
		localStorage.removeItem(LocalStorageKeys.AUTH_USER_ID);
		changeRoute('/login');
	}
}
