import { NotFoundPage } from '@/pages/404';
import { ServerErrorPage } from '@/pages/500';
import { ChatPage } from '@/pages/chat';
import { HomePage } from '@/pages/home';
import { LoginPage } from '@/pages/login';
import { RegistryPage } from '@/pages/registry';
import { ChangePasswordPage } from '@/pages/settings/changePassword';
import { ExitWarningPage } from '@/pages/settings/exitWarning';
import { ProfilePage } from '@/pages/settings/profile';
import type { RouteConfigItem } from '@/shared/types';
import { PagesRoutes } from '@/shared/types';

export const routes: Array<RouteConfigItem> = [
	{
		title: 'Вход',
		url: PagesRoutes.LOGIN,
		component: LoginPage,
	},
	{
		title: 'Регистрация',
		url: PagesRoutes.REGISTRY,
		component: RegistryPage,
	},
	{
		title: '404',
		url: PagesRoutes.NOT_FOUND,
		component: NotFoundPage,
	},
	{
		title: '500',
		url: PagesRoutes.SERVER_ERROR,
		component: ServerErrorPage,
	},
	{
		title: 'Выберите чат',
		url: PagesRoutes.HOME,
		component: HomePage,
		private: true,
	},
	{
		title: 'Профиль',
		url: PagesRoutes.PROFILE,
		component: ProfilePage,
		private: true,
	},
	{
		title: 'Изменить пароль',
		url: PagesRoutes.CHANGE_PASSWORD,
		component: ChangePasswordPage,
		private: true,
	},
	{
		title: 'Выйти',
		url: PagesRoutes.EXIT_WARNING,
		component: ExitWarningPage,
		private: true,
	},
	{
		title: 'Чат',
		url: PagesRoutes.CHAT,
		component: ChatPage,
		private: true,
	},
];
