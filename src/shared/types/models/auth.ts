type UserRole = 'admin' | 'regular';

export type User = {
	id: number;
	first_name: string;
	second_name: string;
	display_name: string;
	login: string;
	email: string;
	phone: string;
	avatar: string;
	role: UserRole;
};

export type UserSmall = Omit<User, 'id' | 'display_name'>;

export type LoginBody = {
	login: string;
	password: string;
};

export type RegistryBody = Omit<UserSmall, 'avatar'> & LoginBody;
