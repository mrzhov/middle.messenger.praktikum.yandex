import { store } from '@/app';
import type { ProfileData, UserInfo } from '@/shared/types';
import { errorHandler } from '@/shared/utils';

import { AccountApi } from './account.api';

export class AccountService {
	private accountApi: AccountApi;

	constructor() {
		this.accountApi = new AccountApi();
		this.changeProfile = errorHandler(this.changeProfile.bind(this));
	}

	async changeProfile(data: ProfileData): Promise<UserInfo> {
		const authUser = await this.accountApi.changeProfile<UserInfo>(data);
		store.setState({
			authUser,
		});
		return authUser;
	}
}
