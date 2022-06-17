import { Block } from '@/shared/core';
import type { PropsWithPageId } from '@/shared/types';

class Navigation extends Block<PropsWithPageId> {
	constructor(props: PropsWithPageId) {
		super(props);
	}

	render(): string {
		// language=hbs
		return `
			<div class="navigation">
				<div class="navigation-item {{#unless pageId}}active{{/unless}}">
					<a href="{{#unless pageId}}javascript:;{{else}}./index.hbs{{/unless}}">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
						</svg>
					</a>
				</div>
				<div class="navigation-item {{#if pageId}}active{{/if}}">
					<a href="{{#if pageId}}javascript:;{{else}}./profile.hbs{{/if}}">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
							<path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
						</svg>
					</a>
				</div>
			</div>
		`;
	}
}

export default Navigation;
