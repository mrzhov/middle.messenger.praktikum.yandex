import { store } from '@/app';
import { ChatService } from '@/services';
import { icons } from '@/shared/content';
import { Block } from '@/shared/core';
import { findParentElementByCondition, numWord } from '@/shared/utils';

async function inputOnChangeHandler(this: any) {
	const { files } = this;
	const file = files ? files[0] : null;
	if (file) {
		const formData = new FormData();
		formData.append('avatar', file);
		const chatService = new ChatService();
		await chatService.changeAvatar(formData);
	}
}

const click = (event: MouseEvent) => {
	event.preventDefault();
	const openChangeAvatarModalButton = findParentElementByCondition(event, (target: any) =>
		target.classList.contains('chat-avatar')
	);
	if (openChangeAvatarModalButton) {
		const input = document.createElement('input');
		input.type = 'file';
		input.onchange = inputOnChangeHandler;
		input.click();
	}
};

class ChatPage extends Block {
	constructor() {
		super({ events: { click } });
	}

	componentDidMount() {
		store.subscribe(state => {
			this.setState({
				currentChat: state.currentChat,
			});
		}, 'currentChat');
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
							<button class="chat-avatar flex-center">
								{{#if ${Boolean(currentChat?.avatar)}}}
									<img src="${process.env.RESOURCES_URL}${currentChat?.avatar}" alt="Avatar">
								{{/if}}
								<div class="chat-avatar-overlay flex-center">
									${icons.avatarOverlay}
								</div>
							</button>
							{{#if this.currentChat}}
								<div>
									<h3 class="text">${chatTitle}</h3>
									<h4 class="subtext">${usersCount} ${usersWord}</h4>
								</div>
							{{/if}}
						</div>
						{{{ChatActionsDropdown}}}
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
