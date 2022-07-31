import type { RouterGuard } from '@/shared/types';

import { Route } from '../Route';

export class Router {
	static #instance: Router;

	readonly #root: HTMLElement;
	readonly #history: History;
	readonly #routes: Array<Route>;
	#defaultRoute: Nullable<Route> = null;
	#guards: Array<RouterGuard> = [];
	currentRoute: Nullable<Route> = null;

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
		const checkGuards = this.#guards.every(guard => guard({ pathname, router: this }));

		if (!route || !checkGuards) {
			return;
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

	addGuard(middleware: RouterGuard) {
		this.#guards.push(middleware);
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
