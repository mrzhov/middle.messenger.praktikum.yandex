import { Block } from '@/shared/core';

import type { LinkProps } from './link.types';

class Link extends Block<LinkProps> {
	constructor(props: LinkProps) {
		super(props);
	}

	render(): string {
		const { text, href } = this.props;

		// language=hbs
		return `
			<div>
				<a href="${href}" class="link">${text}</a>
			</div>
		`;
	}
}

export default Link;
