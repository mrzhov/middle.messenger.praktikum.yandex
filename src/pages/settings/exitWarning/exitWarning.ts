import { AuthService } from '@/services';
import { Block } from '@/shared/core';

class ExitWarningPage extends Block {
	constructor() {
		super();
	}

	protected getStateFromProps() {
		this.state = {
			logoutHandler: async () => {
				const authService = new AuthService();
				await authService.logout();
			},
		};
	}

	render(): string {
		// language=hbs
		return `
			{{#BaseLayout title="Предупреждение о выходе"}}
				<main class="settings-page flex-center">
					<div class="flex-center flex-col space-y-2">
						<p class="text-xl">Вы уверены, что хотите выйти?</p>
						<div class="submit-container">
							{{{Button
								text="Выйти"
								classes="error"
								onClick=logoutHandler
							}}}
						</div>
					</div>
				</main>
			{{/BaseLayout}}
    `;
	}
}

export default ExitWarningPage;
