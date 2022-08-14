import { store } from '@/app';
import { GroupChatUsersModal } from '@/components/modals/groupChatUsersModal';
import { ChatService, MessageService } from '@/services';
import { icons } from '@/shared/content';
import { Block } from '@/shared/core';
import type { StoreState } from '@/shared/core/store/Store.types';
import { findParentElementByCondition, numWord, openModal, useParams } from '@/shared/utils';

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

function click(this: any, event: MouseEvent) {
	const openChangeAvatarModalButton = findParentElementByCondition(event, (target: any) =>
		target.classList.contains('chat-avatar')
	);
	if (openChangeAvatarModalButton && this.state.authUserIsAdmin) {
		const input = document.createElement('input');
		input.type = 'file';
		input.onchange = inputOnChangeHandler;
		input.click();
	}
	if ((event.target as Element).id === 'open-users-modal-btn') {
		openModal(GroupChatUsersModal);
	}
}

class ChatPage extends Block {
	constructor() {
		super({
			events: {
				click: (event: MouseEvent) => {
					event.preventDefault();
					click.call(this, event);
				},
			},
		});
	}

	async componentDidMount() {
		store.subscribe(this.updateCurrentChatHandler.bind(this), 'currentChat');
		const { id: chatId } = useParams();
		const chatService = new ChatService();
		await chatService.updateChatsAndCurrentChat(chatId);
		const token = await chatService.getChatToken(chatId);
		const { authUser } = store.getState();
		if (authUser && chatId && token) {
			this.setState({
				messageService: new MessageService({ userId: authUser.id, chatId, token }),
			});
		}
	}

	getStateFromProps() {
		this.state = {
			...initialState,
		};
	}

	async updateCurrentChatHandler(state: StoreState) {
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
	}

	onDestroy() {
		this.state.messageService.closeConnection();
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
									{{#if (eq this.isDialogChat 'false')}}
										<h4 class="subtext hover-underline" id="open-users-modal-btn">
											${usersCount} ${usersWord}
										</h4>
									{{/if}}
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
						{{#if this.currentChat}}
							{{#if this.currentChat.last_message}}

							{{else}}
								<div class="flex-center h-full">
									<p class="subtext">Здесь пока ничего нет...</p>
								</div>
							{{/if}}
						{{else}}
							<div class="flex-center h-full">
								{{{Loader}}}
							</div>
						{{/if}}
					</div>
					{{{ChatBottomActions}}}
				</main>
			{{/BaseLayout}}
    `;
	}
}

export default ChatPage;
