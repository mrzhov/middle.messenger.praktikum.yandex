import { store } from '@/app';
import { ChatService } from '@/services';
import { Block } from '@/shared/core';
import type { User } from '@/shared/types';
import { closeModalHandler } from '@/shared/utils';

const initialState = {
	isOpen: false,
	chatUsers: null,
	selectedUsersIds: [],
	deleteUsersBtnText: 'Удалить участников',
};

class DeleteChatUsersModal extends Block {
	static componentName = 'DeleteChatUsersModal';

	constructor() {
		super({
			events: {
				click: (event: MouseEvent) => {
					event.preventDefault();
					const target = event.target as Element;
					closeModalHandler.call(this, target);
					if (target.tagName === 'LABEL' && this.state.chatUsers) {
						const id = Number((target as HTMLLabelElement).htmlFor.replace('checkbox-', ''));
						const selectedUsersIds = this.state.selectedUsersIds.includes(id)
							? this.state.selectedUsersIds.filter((selectedId: number) => selectedId !== id)
							: this.state.selectedUsersIds.concat(id);
						this.setState({
							chatUsers: this.state.chatUsers.map((user: User) => {
								if (user.id !== id) {
									return user;
								}
								if ('checked' in user) {
									// @ts-ignore
									delete user.checked;
								} else {
									// @ts-ignore
									user.checked = 'checked';
								}
								return user;
							}),
							selectedUsersIds,
						});
					}
				},
			},
		});
	}

	closeModal() {
		this.setState(initialState);
	}

	componentDidMount() {
		store.subscribe(async state => {
			const { currentChat } = state;
			if (currentChat) {
				const chatUsers = currentChat.users.filter(user => user.role !== 'admin');
				this.setState({
					chatUsers,
				});
			}
		}, 'currentChat');
	}

	protected getStateFromProps() {
		this.state = {
			...initialState,
			closeModal: () => {
				this.setState(initialState);
			},
			onDeleteUsers: async () => {
				const { selectedUsersIds } = this.state;
				const { currentChat } = store.getState();
				if (selectedUsersIds && currentChat) {
					const chatService = new ChatService();
					await chatService.deleteChatUsers({
						chatId: currentChat.id,
						users: selectedUsersIds,
					});
					// TODO
					// await chatService.updateChatsAndCurrentChat();
					this.closeModal();
					this.destroy();
				}
			},
		};
	}

	render(): string {
		const { selectedUsersIds } = this.state;

		// language=hbs
		return `
			<div class="modal-container ${this.state.isOpen ? 'modal-open' : ''}">
				<div class="modal">
					<div class="modal-close-btn">
						{{{Button
							icon="closeModal"
							onClick=closeModal
							classes="btn-icon"
						}}}
					</div>
					<div class="space-y-4">
						<p class="text-center text-xl">Удалить участников</p>
						<div class="checkboxes-container">
							{{#if this.chatUsers}}
								{{#each this.chatUsers}}
									<div class="custom-checkbox">
										<p class="text">{{this.login}}</p>
										<div class="relative">
											<input
												type="checkbox"
												class="checkbox"
												id="checkbox-{{this.id}}"
												{{this.checked}}
											/>
											<label for="checkbox-{{this.id}}" />
										</div>
									</div>
								{{/each}}
							{{else}}
								<p class="text text-center">Вы последний участник чата</p>
							{{/if}}
						</div>
						{{#if this.chatUsers}}
							<div class="submit-container flex-center">
								{{{Button
									text="Удалить участников"
									classes="red"
									onClick=onDeleteUsers
									disabled=${!selectedUsersIds.length}
								}}}
							</div>
						{{/if}}
					</div>
				</div>
			</div>
		`;
	}
}

export default DeleteChatUsersModal;
