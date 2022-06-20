import { icons } from '@/shared/content';
import { Block } from '@/shared/core';
import type { TitleAndPageId } from '@/shared/types';

import profileContent from './profile.content';

class Profile extends Block<TitleAndPageId['pageId']> {
	constructor(props: TitleAndPageId['pageId']) {
		super(props);
	}

	protected getStateFromProps() {
		this.state = {
			profile: profileContent.mockProfile,
		};
	}

	render(): string {
		// language=hbs
		return `
			<div class="sidebar-profile-container">
				<div class="sidebar-profile {{#if (eq pageId "profile")}}selected{{/if}}">
					<a href="{{#if (eq pageId "profile")}}javascript:;{{else}}./profile.hbs{{/if}}">
						<div class="flex items-center">
							<div class="mock-avatar"></div>
							<div>
								<p class="text">{{profile.first_name}}&nbsp;{{profile.second_name}}</p>
								<p class="subtext">{{profile.phone}}</p>
								<p class="subtext">{{profile.login}}</p>
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
