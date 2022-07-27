import { Block } from '@/shared/core';

import content from './500.content';

class ServerErrorPage extends Block {
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

export default ServerErrorPage;
