import { store } from '@/app';
import { ChatService } from '@/services';
import { icons } from '@/shared/content';
import { Block } from '@/shared/core';
import { findParentElementByCondition, numWord } from '@/shared/utils';

const initialState = {
	currentChat: null,
	authUserIsAdmin: 'false',
	isDialogChat: 'false',
};

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

class ChatPage extends Block {
	constructor() {
		super({
			events: {
				click: (event: MouseEvent) => {
					event.preventDefault();
					const openChangeAvatarModalButton = findParentElementByCondition(
						event,
						(target: any) => target.classList.contains('chat-avatar')
					);
					if (openChangeAvatarModalButton && this.state.authUserIsAdmin) {
						const input = document.createElement('input');
						input.type = 'file';
						input.onchange = inputOnChangeHandler;
						input.click();
					}
				},
			},
		});
	}

	componentDidMount() {
		store.subscribe(async state => {
			const { currentChat, authUser } = state;
			if (currentChat && authUser) {
				const chatService = new ChatService();
				const authUserIsAdmin = currentChat.created_by === authUser.id;
				const isDialogChat = await chatService.isDialogChat(currentChat);
				this.setState({
					currentChat,
					authUserIsAdmin: String(authUserIsAdmin),
					isDialogChat: String(isDialogChat),
				});
			}
		}, 'currentChat');
	}

	protected getStateFromProps() {
		this.state = {
			...initialState,
		};
	}

	render(): string {
		const { currentChat, authUserIsAdmin } = this.state;
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
							<button class="flex-center chat-avatar${authUserIsAdmin === 'true' ? ' chat-avatar-hover' : ''}">
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
						{{#if (eq this.isDialogChat 'true')}}
							{{{ChatActionsDropdown
								authUserIsAdmin=this.authUserIsAdmin
								isDialogChat=this.isDialogChat
							}}}
						{{else}}
							{{#if (eq this.authUserIsAdmin 'true')}}
								{{{ChatActionsDropdown
									authUserIsAdmin=this.authUserIsAdmin
									isDialogChat=this.isDialogChat
								}}}
							{{/if}}
						{{/if}}
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
