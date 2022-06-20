import { Block } from '@/shared/core';
import type { TitleAndPageId } from '@/shared/types';

import content from './sidebarSettings.content';

class SidebarSettings extends Block<TitleAndPageId['pageId']> {
	constructor(props: TitleAndPageId['pageId']) {
		super(props);
	}

	render(): string {
		// language=hbs
		return `
			<div class="w-full h-full flex flex-col">
				<div class="sidebar-top border-bottom">
					<div class="w-full h-full flex-center">
						<div class="app-logo">
							${content.icons.logo}
							<h2>Messenger</h2>
						</div>
					</div>
				</div>
				<div class="grow">
					{{{Profile pageId=pageId}}}
					<div class="sidebar-categories-container">
						<ul class="sidebar-categories">
							<li class="sidebar-categories-item {{#if (eq pageId "changePassword")}}selected{{/if}}">
								{{{CategoryItem
									text="Изменить пароль"
									href="/settings/change-password"
									iconName="changePassword"
								}}}
							</li>
							<li class="sidebar-categories-item {{#if (eq pageId "exitWarning")}}selected{{/if}}">
								{{{CategoryItem
									text="Выйти"
									href="/settings/exit-warning"
									iconName="exitWarning"
								}}}
							</li>
						</ul>
					</div>
				</div>
				{{{Navigation pageId=pageId}}}
			</div>
		`;
	}
}

export default SidebarSettings;
