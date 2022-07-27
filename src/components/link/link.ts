import { Block } from '@/shared/core';

import type { LinkProps } from './link.types';

class Link extends Block<LinkProps> {
	static componentName = 'Link';

	constructor({ onClick, ...props }: LinkProps & { onClick: () => void }) {
		super({ ...props, events: { click: onClick } });
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
