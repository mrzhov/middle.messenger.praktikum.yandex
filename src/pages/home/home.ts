import { Block } from '@/shared/core';

class HomePage extends Block {
	constructor() {
		super();
	}

	render(): string {
		// language=hbs
		return `
			{{#BaseLayout }}
				<main>
					<div class="h-screen flex-center">
						<div>
							<p>Выберите чат, чтобы отправить сообщение</p>
						</div>
					</div>
				</main>
			{{/BaseLayout}}
    `;
	}
}

export default HomePage;
