import { Block } from '@/shared/core';
import type { TitleAndPageId } from '@/shared/types';
import { changeRoute, findParentElementByCondition } from '@/shared/utils';

import content from './navigation.content';

const click = (event: MouseEvent) => {
	event.preventDefault();
	const linkElement = findParentElementByCondition(event, (target: any) => target.href);
	if (!linkElement.parentElement?.classList.contains('active')) {
		const path = (linkElement as HTMLAnchorElement).getAttribute('href')!;
		changeRoute(path);
	}
};

class Navigation extends Block {
	constructor(props: TitleAndPageId) {
		super({ events: { click }, ...props });
	}

	render(): string {
		// language=hbs
		return `
			<div class="navigation">
				<div class="navigation-item {{#unless pageId}}active{{/unless}}">
					<a href="/">${content.icons.chat}</a>
				</div>
				<div class="navigation-item {{#if pageId}}active{{/if}}">
					<a href="/settings/profile">${content.icons.settings}</a>
				</div>
			</div>
		`;
	}
}

export default Navigation;
