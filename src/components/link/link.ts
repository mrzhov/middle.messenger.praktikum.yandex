import { Block } from '@/shared/core';

import type { LinkProps } from './link.types';

class Link extends Block<LinkProps> {
	static componentName = 'Link';

	constructor({ onClick, ...props }: LinkProps & { onClick: () => void }) {
		super({ ...props, events: { click: onClick } });
	}

	render(): string {
		const { classes } = this.props;
		// language=hbs
		return `
			<a href="{{href}}" class="link ${classes || ''}">{{text}}</a>
		`;
	}
}

export default Link;
