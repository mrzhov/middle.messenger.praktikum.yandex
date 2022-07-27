import type { Profile } from '@/shared/types';

type Content = { mockProfile: Profile } & Record<string, unknown>;

const content: Content = {
	mockProfile: {
		first_name: 'Ivan',
		second_name: 'Ivanov',
		phone: '+7 999 111 22 33',
		email: 'test@yandex.ru',
		login: '@ivan123',
	},
};

export default content;
