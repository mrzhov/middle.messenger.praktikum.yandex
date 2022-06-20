import { Block } from '@/shared/core';

class ExitWarningPage extends Block {
	constructor() {
		super();
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
							}}}
						</div>
					</div>
				</main>
			{{/BaseLayout}}
    `;
	}
}

export default ExitWarningPage;
