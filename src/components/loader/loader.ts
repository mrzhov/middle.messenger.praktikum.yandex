import { Block } from '@/shared/core';

class Loader extends Block {
	static componentName = 'Loader';

	constructor() {
		super();
	}

	render(): string {
		// language=hbs
		return `
        <div class="spinner-border" role="status">
            <span class="sr-only"></span>
        </div>
    `;
	}
}

export default Loader;
