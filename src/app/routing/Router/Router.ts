import type { RouterGuard } from '@/shared/types';

import { Route } from '../Route';

export class Router {
	static #instance: Router;

	readonly #root: HTMLElement;
	readonly #history: History;
	readonly #routes: Array<Route>;
	#defaultRoute: Nullable<Route> = null;
	currentRoute: Nullable<Route> = null;
	#authGuard: Nullable<RouterGuard> = null;

	constructor(root: HTMLElement) {
		this.#root = root;
		this.#history = window.history;
		this.#routes = [];
	}

	static getInstance(root?: HTMLElement): Router {
		if (this.#instance) {
			return this.#instance;
		}
		if (!root) {
			throw Error('First initialization required root element!');
		}
		this.#instance = new Router(root);
		return this.#instance;
	}

	#getRoute(pathname: string) {
		return this.#routes.find(route => route.match(pathname)) ?? this.#defaultRoute;
	}

	#onRoute(pathname: string) {
		const route = this.#getRoute(pathname);
		if (!route) {
			return;
		}

		if (this.#authGuard) {
			this.#authGuard({ pathname, router: this }).then(result => {
				if (typeof result.redirect === 'string') {
					this.go(result.redirect);
				}
			});
		}

		if (this.currentRoute) {
			this.currentRoute.leave();
		}

		this.currentRoute = route;
		route.render();
	}

	use(pathname: string, view: BlockConstructable) {
		const route = new Route({
			pathname,
			view,
			root: this.#root,
		});
		this.#routes.push(route);

		return this;
	}

	useAsDefault(pathname: string, view: BlockConstructable) {
		this.#defaultRoute = new Route({
			pathname,
			view,
			root: this.#root,
		});
	}

	start() {
		window.addEventListener('popstate', () => {
			this.#onRoute(window.location.pathname);
		});

		this.#onRoute(window.location.pathname);
	}

	addAuthGuard(authGuard: RouterGuard) {
		this.#authGuard = authGuard;
	}

	go(pathname: string) {
		this.#history.pushState({}, '', pathname);
		this.#onRoute(pathname);
	}

	back() {
		this.#history.back();
	}

	forward() {
		this.#history.forward();
	}
}
