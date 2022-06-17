import { Block } from '@/shared/core';

class ChangePasswordPage extends Block {
	constructor() {
		super();
	}

	render(): string {
		// language=hbs
		return `
			{{#BaseLayout pageId="changePassword" title="Изменить пароль"}}
				<main class="settings-page with-form">
					<div class="settings-page-wrapper">
						<div class="flex-center flex-col w-full space-y-4">
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
