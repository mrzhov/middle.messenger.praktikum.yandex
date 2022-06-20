import { Block } from '@/shared/core';

import type { BaseLayoutProps } from './base.types';

class BaseLayout extends Block<BaseLayoutProps> {
	constructor(props: BaseLayoutProps) {
		super(props);
	}

	render(): string {
		const { pathname } = window.location;
		const isSettingsArea = pathname.includes('/settings');

		// language=hbs
		return `
			<div class="flex w-screen">
				<div class="sidebar-container">
					{{#if ${isSettingsArea}}}
						{{{SidebarSettings}}}
					{{else}}
						{{{SidebarChat}}}
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
