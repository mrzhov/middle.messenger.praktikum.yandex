import { Block } from '@/shared/core';

class ChatPage extends Block {
	constructor() {
		super();
	}

	render(): string {
		// language=hbs
		return `
			{{#BaseLayout}}
				<main>
					<div class="h-screen flex-center">
						<div>
							<p>Страница чата</p>
						</div>
					</div>
				</main>
			{{/BaseLayout}}
    `;
	}
}

export default ChatPage;
