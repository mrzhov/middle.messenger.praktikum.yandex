import { icons, mockChatList } from '@/shared/content';
import { Block } from '@/shared/core';

const getChatInfo = () => {
	const { pathname } = window.location;
	const id = pathname.split('/').pop();
	return mockChatList.find(item => item.id === id);
};

class ChatPage extends Block {
	constructor() {
		super();
	}

	protected getStateFromProps() {
		this.state = {
			chatInfo: getChatInfo(),
		};
	}

	render(): string {
		const { chatInfo } = this.state;

		// language=hbs
		return `
			{{#BaseLayout}}
				<main>
					<header class="page-header flex items-center justify-between">
						<div class="flex-center">
							<div class="mock-avatar small"></div>
							<h3 class="text">${chatInfo.name}</h3>
						</div>
						<button class="btn-icon w-10 h-10">${icons.dots}</button>
					</header>
				</main>
			{{/BaseLayout}}
    `;
	}
}

export default ChatPage;
