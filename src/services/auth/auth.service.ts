import { errorHandler } from '@/shared/services';
import type { LoginBody } from '@/shared/types';

import { AuthApi } from './auth.api';

export class AuthService {
	private authApi: AuthApi;

	constructor() {
		this.authApi = new AuthApi();
		this.login = errorHandler(this.login.bind(this));
		// this.logout = errorHandler(this.logout.bind(this), uiStore);
	}

	async login(data: LoginBody): Promise<void> {
		const response = await this.authApi.login(data);
		console.log(response);
		// setCookie(null, CookiesEnum.TOKEN, response.data.token);
		// setCookie(null, CookiesEnum.REFRESH_TOKEN, response.data.refreshToken);
		// await Router.push('/');
	}

	// async logout(): Promise<void> {
	// 	const response = await this.authApi.logout();
	// 	if (response.status === 200) {
	// 		destroyCookie(null, CookiesEnum.TOKEN);
	// 		destroyCookie(null, CookiesEnum.REFRESH_TOKEN);
	// 	}
	// 	await Router.push('/login');
	// }
}
