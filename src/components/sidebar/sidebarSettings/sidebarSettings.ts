import { icons } from '@/shared/content';
import { Block } from '@/shared/core';
import { PagesRoutes } from '@/shared/types';

class SidebarSettings extends Block {
	static componentName = 'SidebarSettings';

	constructor() {
		super();
	}

	render(): string {
		const { pathname } = window.location;
		const isChangePasswordPage = pathname === PagesRoutes.CHANGE_PASSWORD;
		const isExitWarningPage = pathname === PagesRoutes.EXIT_WARNING;

		// language=hbs
		return `
			<div class="w-full h-full flex flex-col">
				<div class="sidebar-top border-bottom">
					<div class="w-full h-full flex-center">
						<div class="app-logo">
							${icons.logo}
							<h2>Messenger</h2>
						</div>
					</div>
				</div>
				<div class="grow">
					{{{Profile}}}
					<div class="sidebar-categories-container">
						<ul class="sidebar-categories">
							<li class="sidebar-categories-item ${isChangePasswordPage ? 'active' : ''}">
								{{{CategoryItem
									text="Изменить пароль"
									href="/settings/change-password"
									iconName="changePassword"
								}}}
							</li>
							<li class="sidebar-categories-item ${isExitWarningPage ? 'active' : ''}">
								{{{CategoryItem
									text="Выйти"
									href="/settings/exit-warning"
									iconName="exitWarning"
								}}}
							</li>
						</ul>
					</div>
				</div>
				{{{Navigation}}}
			</div>
		`;
	}
}

export default SidebarSettings;
