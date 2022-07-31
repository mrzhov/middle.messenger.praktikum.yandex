import type { Router } from '@/app/routing';

export enum PagesRoutes {
	LOGIN = '/login',
	REGISTRY = '/registry',
	HOME = '/',
	PROFILE = '/settings/profile',
	CHANGEPASSWORD = '/settings/change-password',
	EXITWARNING = '/settings/exit-warning',
	CHAT = '/chat/:id',
	CHATWELCOME = '/chat/:id/welcome',
	SERVERERROR = '/500',
	NOTFOUND = '*',
}

export type RouteConfigItem = {
	title: string;
	url: string;
	component: BlockConstructable;
};

type RouterGuardArgs = {
	pathname: string;
	router: Router;
};

export type RouterGuard = (data: RouterGuardArgs) => boolean;
export type DynamicParams = Record<string, string>;
