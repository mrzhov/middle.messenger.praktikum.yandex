import { Block } from '@/shared/core';

class ChangePasswordPage extends Block {
	constructor() {
		super();
	}

	render(): string {
		// language=hbs
		return `
			{{#BaseLayout title="Изменить пароль"}}
				<main class="settings-page with-form">
					<div class="settings-page-wrapper">
						<div class="flex-center flex-col w-full space-y-4">
							<form class="space-y-3">
								{{{Input
									name="oldPassword"
									label="Старый пароль"
									type="password"
								}}}

								{{{Input
									name="newPassword"
									label="Новый пароль"
									type="password"
								}}}

								{{{Input
									name="newPassword-repeat"
									label="Повторите новый пароль"
									type="password"
								}}}
							</form>
							<div class="submit-container">
								{{{Button text="Сохранить"}}}
							</div>
						</div>
					</div>
				</main>
			{{/BaseLayout}}
    `;
	}
}

export default ChangePasswordPage;
