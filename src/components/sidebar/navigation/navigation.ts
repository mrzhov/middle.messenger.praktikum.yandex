import { icons } from '@/shared/content';
import { Block } from '@/shared/core';
import { changeRoute, findParentElementByCondition } from '@/shared/utils';

const click = (event: MouseEvent) => {
	event.preventDefault();
	const linkElement = findParentElementByCondition(event, (target: any) => target.href);
	if (!linkElement.parentElement?.classList.contains('active')) {
		const path = (linkElement as HTMLAnchorElement).getAttribute('href')!;
		changeRoute(path);
	}
};

class Navigation extends Block {
	static componentName = 'Navigation';

	constructor() {
		super({ events: { click } });
	}

	render(): string {
		const { pathname } = window.location;
		const isSettingsArea = pathname.includes('/settings');

		// language=hbs
		return `
			<div class="navigation">
				<div class="navigation-item ${!isSettingsArea ? 'active' : ''}">
					<a href="/">${icons.chat}</a>
				</div>
				<div class="navigation-item ${isSettingsArea ? 'active' : ''}">
					<a href="/settings/profile">${icons.settings}</a>
				</div>
			</div>
		`;
	}
}

export default Navigation;
