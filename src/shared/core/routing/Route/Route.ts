import type { Block } from '@/shared/core';
import { renderComponent } from '@/shared/core/utils';
import type { DynamicParams } from '@/shared/types';

import type { RouteParams } from './Route.types';

export class Route {
	readonly pathname: string;
	readonly #view: BlockConstructable;
	readonly #root: HTMLElement;
	readonly #dynamicParams: Nullable<Array<string>>;
	#block: Nullable<Block> = null;

	constructor({ pathname, view, root }: RouteParams) {
		this.pathname = pathname;
		this.#view = view;
		this.#root = root;
		this.#dynamicParams = pathname.match(/:\w+/g);
	}

	match(pathname: string) {
		if (this.#dynamicParams) {
			let pathParts = pathname.split('/').slice(1);
			let localPathParts = this.pathname.split('/').slice(1);
			if (pathParts.length !== localPathParts.length) {
				return false;
			}
			const dynamicParamsIndexes: Array<number> = [];
			this.#dynamicParams.forEach(param => {
				localPathParts = localPathParts.filter((path, i) => {
					if (path === param) {
						dynamicParamsIndexes.push(i);
					}
					return path !== param;
				});
			});
			pathParts = pathParts.filter((_, i) => !dynamicParamsIndexes.includes(i));
			let result = true;
			pathParts.forEach((path, i) => {
				if (localPathParts[i] !== path) {
					result = false;
				}
			});
			return result;
		}
		return pathname === this.pathname;
	}

	getDynamicParamsObj(pathname: string): DynamicParams {
		if (!this.#dynamicParams) {
			return {};
		}
		const pathParts = pathname.split('/').slice(1);
		const localPathParts = this.pathname.split('/').slice(1);
		const params: DynamicParams = {};
		this.#dynamicParams.forEach(param => {
			const valueIndex = localPathParts.findIndex(localPath => localPath === param);
			params[param.replace(':', '')] = pathParts[valueIndex];
		});
		return params;
	}

	leave() {
		if (this.#block) {
			this.#block.hide();
		}
	}

	render() {
		this.#block = new this.#view({});
		(this.#block as Block).show();
		renderComponent(this.#root, this.#block as Block);
	}
}
