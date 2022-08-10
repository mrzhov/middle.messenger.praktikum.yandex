import { store } from '@/app';
import { ChatService, UserService } from '@/services';
import { Block } from '@/shared/core';
import type { User } from '@/shared/types';
import { blurHandler, closeModalHandler, focusHandler, getValueFromRefs } from '@/shared/utils';
import { loginValidator } from '@/shared/validators';

const initialState = {
	isOpen: false,
	usersVariants: null,
	selectedUsers: [],
	addUsersBtnText: 'Добавить пользователей',
	values: {
		login: '',
	},
	errors: {
		login: '',
	},
};

class AddChatUsersModal extends Block {
	static componentName = 'AddChatUsersModal';

	constructor() {
		super({
			events: {
				click: (event: MouseEvent) => {
					event.preventDefault();
					const target = event.target as Element;
					closeModalHandler.call(this, target);
					if (target.classList.contains('input-options-btn') && this.state.usersVariants) {
						const selectedUser = this.state.usersVariants.find(
							(user: User) => user.login === target.textContent
						);
						const userAlreadyAdded = this.state.selectedUsers.find(
							(user: User) => user.id === selectedUser.id
						);
						if (userAlreadyAdded) {
							const nextState = {
								...this.state,
								usersVariants: null,
								values: initialState.values,
								errors: {
									login: `${selectedUser.login} уже выбран`,
								},
							};
							this.setState(nextState);
							return;
						}
						const selectedUsers = this.state.selectedUsers.concat(selectedUser);
						if (selectedUser) {
							this.setState({
								usersVariants: null,
								selectedUsers,
								addUsersBtnText:
									selectedUsers.length === 1
										? `Добавить пользователя ${selectedUser.login}`
										: `Добавить пользователей (${selectedUsers.length})`,
								values: initialState.values,
								errors: initialState.errors,
							});
						}
					}
				},
			},
		});
	}

	closeModal() {
		this.setState(initialState);
	}

	protected getStateFromProps() {
		this.state = {
			...initialState,
			onFocusHandler: (event: FocusEvent) => {
				focusHandler.call(this, event);
			},
			onBlurHandler: (event: FocusEvent) => {
				blurHandler.call(this, event);
			},
			onSearch: async (event: MouseEvent) => {
				event.preventDefault();

				const addChatUsersData = {
					login: getValueFromRefs(this.refs, 'login'),
				};

				const nextState = {
					...this.state,
					values: { ...addChatUsersData },
					errors: initialState.errors,
				};

				nextState.errors.login = loginValidator(addChatUsersData.login);

				this.setState(nextState);

				if (Object.values(nextState.errors).every(e => !e)) {
					const userService = new UserService();
					const users = await userService.searchUsers(addChatUsersData.login);
					if (!users.length) {
						nextState.errors.login = 'Совпадений не найдено';
						this.setState(nextState);
						return;
					}
					nextState.usersVariants = users;
					this.setState(nextState);
				}
			},
			onAddUsers: async () => {
				const { selectedUsers } = this.state;
				const { currentChat } = store.getState();
				if (selectedUsers && currentChat) {
					const chatService = new ChatService();
					const usersIds = selectedUsers.map((user: User) => user.id);
					await chatService.addChatUsers({ chatId: currentChat.id, users: usersIds });
					await chatService.updateChatsAndCurrentChat();
					this.closeModal();
					this.destroy();
				}
			},
		};
	}

	render(): string {
		const { errors, values, selectedUsers } = this.state;

		// language=hbs
		return `
			<div class="modal-container ${this.state.isOpen ? 'modal-open' : ''}">
				<div class="modal space-y-4">
					<p class="text-center text-xl">Добавить пользователей</p>
					<form class="space-y-4">
						<div class="flex space-x-2">
							<div class="relative grow">
								{{{Input
									variant="standard-black"
									ref="login"
									name="login"
									label="Логин пользователя"
									value="${values.login}"
									error="${errors.login}"
									onFocus=onFocusHandler
									onBlur=onBlurHandler
								}}}
								{{#if this.usersVariants}}
									<div class="input-options">
										<div class="input-options-content">
											{{#each this.usersVariants}}
												<button class="input-options-btn">{{this.login}}</button>
											{{/each}}
										</div>
									</div>
								{{/if}}
							</div>
							<div>
								{{{Button
									text="Найти"
									onClick=onSearch
									classes="py-4"
								}}}
							</div>
						</div>
					</form>
					<div class="chips-container">
						{{#if this.selectedUsers.length}}
							{{#each this.selectedUsers}}
								<div class="chip">
									<p class="text">{{this.login}}</p>
								</div>
							{{/each}}
						{{else}}
							<p class="text">Найдите пользователей...</p>
						{{/if}}
					</div>
					<div class="submit-container flex-center">
						{{{Button
							text=addUsersBtnText
							onClick=onAddUsers
							disabled=${!selectedUsers.length}
						}}}
					</div>
				</div>
			</div>
		`;
	}
}

export default AddChatUsersModal;
