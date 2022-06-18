import { Block } from '@/shared/core';
import type { TitleAndPageId } from '@/shared/types';

import content from './navigation.content';

/** data-lake-angular */
// findParentElementById(event: any, condition: (target: any) => boolean) {
// 	let { target } = event;
// 	while (target) {
// 		if (condition(target)) {
// 			return target;
// 		}
// 		target = target.parentElement;
// 	}
// 	return undefined;
// }

const onClick = (event: MouseEvent) => {
	console.log(event);
};

class Navigation extends Block {
	constructor(props: TitleAndPageId) {
		super({ events: { click: onClick }, ...props });
	}

	protected getStateFromProps() {
		this.state = {
			linkSettingsClickHandler: (event: MouseEvent) => {
				event.preventDefault();
				console.log(event);
				// const path = (event.target as HTMLAnchorElement).getAttribute('href')!;
				// changeRoute(path);
			},
		};
	}

	render(): string {
		// language=hbs
		return `
			<div class="navigation">
				<div class="navigation-item {{#unless pageId}}active{{/unless}}">
					<a href="#">${content.icons.chat}</a>
				</div>
				<div class="navigation-item {{#if pageId}}active{{/if}}">
					<a href="#">${content.icons.settings}</a>
				</div>
			</div>
		`;
	}
}

export default Navigation;

// 					<a href="/">${content.icons.chat}</a>
// 					<a href="/settings/profile">${content.icons.settings}</a>
