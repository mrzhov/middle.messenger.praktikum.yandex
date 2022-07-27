import { Block } from '@/shared/core';

import content from './404.content';

class NotFoundPage extends Block {
	constructor() {
		super();
	}

	render(): string {
		// language=hbs
		return `
			{{#AuthLayout }}
				{{{ErrorPageContent
					title="${content.title}"
					subtitle="${content.subtitle}"
					linkText="${content.linkText}"
					linkHref="${content.linkHref}"
				}}}
			{{/AuthLayout}}
    `;
	}
}

export default NotFoundPage;
