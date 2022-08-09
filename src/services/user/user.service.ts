import { store } from '@/app';
import type { ChangePasswordData, ProfileData, User } from '@/shared/types';
import { errorHandler } from '@/shared/utils';

import { UserApi } from './user.api';

export class UserService {
	private userApi: UserApi;

	constructor() {
		this.userApi = new UserApi();
		this.changeProfile = errorHandler(this.changeProfile.bind(this));
		this.changePassword = errorHandler(this.changePassword.bind(this));
		this.changeAvatar = errorHandler(this.changeAvatar.bind(this));
	}

	async changeProfile(data: ProfileData): Promise<User> {
		const authUser = await this.userApi.changeProfile<User>(data);
		store.setState({
			authUser,
		});
		return authUser;
	}

	async changePassword(data: ChangePasswordData): Promise<void> {
		await this.userApi.changePassword(data);
	}

	async changeAvatar(data: FormData): Promise<User> {
		const authUser = await this.userApi.changeAvatar<User>(data);
		store.setState({
			authUser,
		});
		return authUser;
	}

	async searchUsers(login: string): Promise<Array<User>> {
		const users = await this.userApi.searchUsers<Array<User>>(login);
		return users;
	}
}
