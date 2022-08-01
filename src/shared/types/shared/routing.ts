import type { Router } from '@/app/routing';

export enum PagesRoutes {
	LOGIN = '/login',
	REGISTRY = '/registry',
	HOME = '/',
	PROFILE = '/settings/profile',
	CHANGE_PASSWORD = '/settings/change-password',
	EXIT_WARNING = '/settings/exit-warning',
	CHAT = '/chat/:id',
	SERVER_ERROR = '/500',
	NOT_FOUND = '*',
}

export type RouteConfigItem = {
	title: string;
	url: string;
	component: BlockConstructable;
	private?: true;
};

type RouterGuardArgs = {
	pathname: string;
	router: Router;
};

type RouterGuardResult = { redirect?: string };

export type RouterGuard = (data: RouterGuardArgs) => Promise<RouterGuardResult>;
export type DynamicParams = Record<string, string>;
