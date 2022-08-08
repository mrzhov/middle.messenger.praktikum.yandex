import { store } from '@/app';
import { Block } from '@/shared/core';
import { numWord } from '@/shared/utils';

class ChatPage extends Block {
	constructor() {
		super();
	}

	componentDidMount() {
		store.subscribe(state => {
			this.setState({
				currentChat: state.currentChat,
			});
		}, 'currentChat');
	}

	protected async getStateFromProps() {
		this.state = {
			openChatActions: () => {
				console.log('openChatActions');
			},
		};
	}

	render(): string {
		const { currentChat } = this.state;
		const chatTitle = currentChat?.title || '';
		const usersCount = currentChat?.users?.length || '';
		const usersWord = currentChat?.users
			? numWord(currentChat.users?.length, ['участник', 'участника', 'участников'])
			: '';

		// language=hbs
		return `
			{{#BaseLayout}}
				<main class="flex flex-col h-full">
					<header class="page-header flex items-center justify-between">
						<div class="flex-center">
							<div class="mock-avatar small"></div>
							{{#if this.currentChat}}
								<div>
									<h3 class="text">${chatTitle}</h3>
									<h4 class="subtext">${usersCount} ${usersWord}</h4>
								</div>
							{{/if}}
						</div>
						{{{Button
							icon="dots"
							onClick=openChatActions
						}}}
					</header>
					<div class="chat-messages">
						<div class="space-y-2">
							
						</div>
					</div>
					{{{ChatBottomActions}}}
				</main>
			{{/BaseLayout}}
    `;
	}
}

export default ChatPage;
