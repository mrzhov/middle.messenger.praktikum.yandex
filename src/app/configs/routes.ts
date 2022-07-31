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
		title: '...',
		url: PagesRoutes.HOME,
		component: HomePage,
	},
	{
		title: '404',
		url: PagesRoutes.NOTFOUND,
		component: NotFoundPage,
	},
	{
		title: '500',
		url: PagesRoutes.SERVERERROR,
		component: ServerErrorPage,
	},
	{
		title: 'Профиль',
		url: PagesRoutes.PROFILE,
		component: ProfilePage,
	},
	{
		title: 'Изменить пароль',
		url: PagesRoutes.CHANGEPASSWORD,
		component: ChangePasswordPage,
	},
	{
		title: 'Выйти',
		url: PagesRoutes.EXITWARNING,
		component: ExitWarningPage,
	},
	{
		title: 'Чат',
		url: PagesRoutes.CHAT,
		component: ChatPage,
	},
	{
		title: 'Чат welcome',
		url: PagesRoutes.CHATWELCOME,
		component: ChatPage,
	},
];
