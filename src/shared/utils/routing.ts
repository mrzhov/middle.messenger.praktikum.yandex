import { Router } from '@/shared/core';

export const changeRoute = (path: string) => {
	const router = Router.getInstance();
	router.go(path);
};
