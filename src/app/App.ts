import { registerData } from '@/app/utils';

import { routes } from './configs';
import { Router } from './routing';

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
		this.#router.addGuard(() => {
			return true;
		});
	}
}
