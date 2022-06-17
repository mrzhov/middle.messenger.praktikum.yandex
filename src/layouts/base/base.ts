import { Block } from '@/shared/core';
import type { PropsWithPageId } from '@/shared/types';

class BaseLayout extends Block<PropsWithPageId> {
	constructor(props: PropsWithPageId) {
		super(props);
	}

	render(): string {
		// language=hbs
		return `
			<div class="flex w-screen">
				<div class="sidebar-container">
					{{{SidebarChat pageId=pageId}}}
				</div>
				<div class="page-container">
					<div data-layout></div>
				</div>
			</div>
    `;
	}
}

export default BaseLayout;
