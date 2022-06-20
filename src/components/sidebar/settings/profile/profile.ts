import { icons } from '@/shared/content';
import { Block } from '@/shared/core';
import { changeRoute, findParentElementByCondition } from '@/shared/utils';

import content from './profile.content';

const click = (event: MouseEvent) => {
	event.preventDefault();
	const linkElement = findParentElementByCondition(event, (target: any) => target.href);
	if (linkElement && !linkElement.parentElement?.classList.contains('active')) {
		const path = (linkElement as HTMLAnchorElement).getAttribute('href')!;
		changeRoute(path);
	}
};

class Profile extends Block {
	constructor(props: any) {
		super({ events: { click }, ...props });
	}

	render(): string {
		// language=hbs
		return `
			<div class="sidebar-profile-container">
				<div class="sidebar-profile {{#if (eq pageId "profile")}}active{{/if}}">
					<a href="/settings/profile">
						<div class="flex items-center">
							<div class="mock-avatar"></div>
							<div>
								<p class="text">${content.mockProfile.first_name}&nbsp;${content.mockProfile.second_name}</p>
								<p class="subtext">${content.mockProfile.phone}</p>
								<p class="subtext">${content.mockProfile.login}</p>
							</div>
						</div>
						<div class="sidebar-settings-arrow">
							${icons.arrowRight}
						</div>
					</a>
				</div>
			</div>
		`;
	}
}

export default Profile;
