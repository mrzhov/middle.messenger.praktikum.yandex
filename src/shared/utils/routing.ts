import { Router } from '@/app/routing';

export const changeRoute = (path: string) => {
	const router = Router.getInstance();
	router.go(path);
};
