import { store } from '@/app';
import type { ChangePasswordData, ProfileData, UserInfo } from '@/shared/types';
import { errorHandler } from '@/shared/utils';

import { AccountApi } from './account.api';

export class AccountService {
	private accountApi: AccountApi;

	constructor() {
		this.accountApi = new AccountApi();
		this.changeProfile = errorHandler(this.changeProfile.bind(this));
		this.changePassword = errorHandler(this.changePassword.bind(this));
	}

	async changeProfile(data: ProfileData): Promise<UserInfo> {
		const authUser = await this.accountApi.changeProfile<UserInfo>(data);
		store.setState({
			authUser,
		});
		return authUser;
	}

	async changePassword(data: ChangePasswordData): Promise<void> {
		await this.accountApi.changePassword(data);
	}
}
