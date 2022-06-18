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
							<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
								<path fill-rule="evenodd" clip-rule="evenodd" d="M7.29303 14.707C7.10556 14.5195 7.00024 14.2652 7.00024 14C7.00024 13.7348 7.10556 13.4805 7.29303 13.293L10.586 10L7.29303 6.707C7.11087 6.51839 7.01008 6.26579 7.01236 6.00359C7.01463 5.7414 7.1198 5.49058 7.30521 5.30518C7.49062 5.11977 7.74143 5.0146 8.00363 5.01232C8.26583 5.01004 8.51843 5.11084 8.70703 5.293L12.707 9.293C12.8945 9.48052 12.9998 9.73483 12.9998 10C12.9998 10.2652 12.8945 10.5195 12.707 10.707L8.70703 14.707C8.5195 14.8945 8.26519 14.9998 8.00003 14.9998C7.73487 14.9998 7.48056 14.8945 7.29303 14.707Z" fill="#647281"/>
							</svg>
						</div>
					</a>
				</div>
			</div>
		`;
	}
}

export default Profile;