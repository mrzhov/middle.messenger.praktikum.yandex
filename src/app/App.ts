import { AuthService } from '@/services';
import { Router } from '@/shared/core';
import { registerData } from '@/shared/core/utils';
import { LocalStorageKeys } from '@/shared/types';

import { routes } from './configs';

export class App {
	static #instance: App;
	#router: Router;

	constructor(selector: string) {
		registerData();
		this.#router = this.#createRouter(selector);
		this.#addAuthGuard();
		this.#router.start();
	}

	static getInstance(selector: string): App {
		if (this.#instance) {
			return this.#instance;
		}
		this.#instance = new App(selector);
		return this.#instance;
	}

	#createRouter(selector: string): Router {
		const root = document.querySelector(selector);

		if (!root) {
			throw new Error('Failed to find root element by selector!');
		}

		const router = Router.getInstance(root as HTMLElement);

		routes.forEach(route => {
			if (route.url === '*') {
				router.useAsDefault(route.url, route.component);
			} else {
				router.use(route.url, route.component);
			}
		});

		return router;
	}

	#addAuthGuard() {
		this.#router.addAuthGuard(async ({ pathname }) => {
			const authUserId = localStorage.getItem(LocalStorageKeys.AUTH_USER_ID);
			const privateRoutes = routes.filter(r => r.private).map(r => r.url);
			const authRoutes = routes.filter(r => r.auth).map(r => r.url);
			if (privateRoutes.includes(pathname)) {
				if (authUserId) {
					return {};
				}
				const authService = new AuthService();
				try {
					await authService.getUserInfo();
					return {};
				} catch (e) {
					return {
						redirect: '/login',
					};
				}
			}
			if (authRoutes.includes(pathname) && authUserId) {
				return {
					redirect: '/',
				};
			}
			return {};
		});
	}
}
