import { store } from '@/app';
import { icons } from '@/shared/content';
import { Block } from '@/shared/core';
import { PagesRoutes } from '@/shared/types';
import { changeRoute, findParentElementByCondition } from '@/shared/utils';

import type { ProfileState } from './profile.types';

const click = (event: MouseEvent) => {
	event.preventDefault();
	const linkElement = findParentElementByCondition(event, (target: any) => target.href);
	if (linkElement && !linkElement.parentElement?.classList.contains('active')) {
		const path = (linkElement as HTMLAnchorElement).getAttribute('href')!;
		changeRoute(path);
	}
};

class Profile extends Block {
	static componentName = 'Profile';

	constructor() {
		super({ events: { click } });
	}

	componentDidMount() {
		store.subscribe(state => {
			this.setState({
				authUser: state.authUser,
			});
		}, 'authUser');
	}

	render(): string {
		const { pathname } = window.location;
		const isProfilePage = pathname === PagesRoutes.PROFILE;
		const { authUser } = this.state as ProfileState;

		// language=hbs
		return `
			<div class="sidebar-profile-container">
				<div class="sidebar-profile ${isProfilePage ? 'active' : ''}">
					<a href="/settings/profile">
						<div class="flex items-center">
							{{#if ${Boolean(authUser && authUser?.avatar)}}}
								<img class="sidebar-profile-avatar" src="${process.env.RESOURCES_URL}${
			authUser?.avatar
		}" alt="Avatar">
							{{else}}
								<div class="mock-avatar"></div>
							{{/if}}
							<div>
								<p class="text">${authUser?.first_name || ''}&nbsp;${authUser?.second_name || ''}</p>
								<p class="subtext">${authUser?.phone || ''}</p>
								<p class="subtext">${authUser?.login || ''}</p>
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
