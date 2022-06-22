import { Block } from '@/shared/core';

import type { LinkProps } from './link.types';

class Link extends Block {
	static componentName = 'Link';

	constructor({ onClick, ...props }: LinkProps) {
		super({ events: { click: onClick }, ...props });
	}

	render(): string {
		// language=hbs
		return `
			<div>
				<a href="{{href}}" class="link">{{text}}</a>
			</div>
		`;
	}
}

export default Link;
