import { Block } from '@/shared/core';
import type { TitleAndPageId } from '@/shared/types';

class BaseLayout extends Block<TitleAndPageId> {
	constructor(props: TitleAndPageId) {
		super(props);
	}

	render(): string {
		// language=hbs
		return `
			<div class="flex w-screen">
				<div class="sidebar-container">
					{{#if pageId}}
						{{{SidebarSettings pageId=pageId}}}
					{{else}}
						{{{SidebarChat pageId=pageId}}}
					{{/if}}
				</div>
				<div class="page-container">
					{{#if title}}
						<header class="page-header flex-center">
							<h3 class="text">{{title}}</h3>
						</header>
					{{/if}}
					<div data-layout></div>
				</div>
			</div>
    `;
	}
}

export default BaseLayout;
