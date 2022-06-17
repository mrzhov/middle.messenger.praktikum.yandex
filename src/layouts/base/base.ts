import { Block } from '@/shared/core';

class BaseLayout extends Block {
	constructor() {
		super();
	}

	render(): string {
		// language=hbs
		return `
			<div class="flex w-screen">
				<div class="sidebar-container">
					Sidebar
				</div>
				<div class="page-container">
					<div data-layout></div>
				</div>
			</div>
    `;
	}
}

export default BaseLayout;
