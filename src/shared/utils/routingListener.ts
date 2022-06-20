import { NotFoundPage } from '@/pages/404';
import { ServerErrorPage } from '@/pages/500';
import { HomePage } from '@/pages/home';
import { LoginPage } from '@/pages/login';
import { RegistryPage } from '@/pages/registry';
import { ChangePasswordPage } from '@/pages/settings/changePassword';
import { ExitWarningPage } from '@/pages/settings/exitWarning';
import { ProfilePage } from '@/pages/settings/profile';
import { renderDOM } from '@/shared/core';
import { PagesRoutes } from '@/shared/types';

const pagesDictionary: Record<string, BlockConstructable> = {
	[PagesRoutes.LOGIN]: LoginPage,
	[PagesRoutes.REGISTRY]: RegistryPage,
	[PagesRoutes.HOME]: HomePage,
	[PagesRoutes.NOTFOUND]: NotFoundPage,
	[PagesRoutes.SERVERERROR]: ServerErrorPage,
	[PagesRoutes.PROFILE]: ProfilePage,
	[PagesRoutes.CHANGEPASSWORD]: ChangePasswordPage,
	[PagesRoutes.EXITWARNING]: ExitWarningPage,
};

const locationObserverCallback = () => {
	const { pathname } = window.location;
	const Page = pagesDictionary[pathname];
	const page = new Page({});
	renderDOM(page);
};

export const routingListener = () => {
	window.addEventListener('popstate', locationObserverCallback);
};

export const changeRoute = (path: string) => {
	window.history.pushState('', '', path);
	window.history.pushState('', '', path);
	window.history.go(-1);
};
