import { store } from '@/app';
import { ChatService, UserService } from '@/services';
import { Block } from '@/shared/core';
import type { User } from '@/shared/types';
import {
	blurHandler,
	closeModalHandler,
	focusHandler,
	getDialogChatTitle,
	getValueFromRefs,
} from '@/shared/utils';
import { loginValidator } from '@/shared/validators';

const initialState = {
	isOpen: false,
	usersVariants: null,
	selectedUser: null,
	createBtnText: 'Создать',
	values: {
		login: '',
	},
	errors: {
		login: '',
	},
};

class CreateDialogModal extends Block {
	static componentName = 'CreateDialogModal';

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
						if (selectedUser) {
							this.setState({
								usersVariants: null,
								selectedUser,
								createBtnText: `Создать диалог с ${selectedUser.login}`,
								values: {
									login: selectedUser.login,
								},
								errors: {
									login: '',
								},
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

				const createDialogData = {
					login: getValueFromRefs(this.refs, 'login'),
				};

				const nextState = {
					...this.state,
					values: { ...createDialogData },
					errors: initialState.errors,
				};

				nextState.errors.login = loginValidator(createDialogData.login);

				this.setState(nextState);

				if (Object.values(nextState.errors).every(e => !e)) {
					const userService = new UserService();
					const users = await userService.searchUsers(createDialogData.login);
					if (!users.length) {
						nextState.errors.login = 'Совпадений не найдено';
						this.setState(nextState);
						return;
					}
					nextState.usersVariants = users;
					this.setState(nextState);
				}
			},
			onCreate: async () => {
				const { authUser } = store.getState();
				const { selectedUser } = this.state;
				if (authUser && selectedUser) {
					const chatService = new ChatService();
					const title = getDialogChatTitle(authUser, selectedUser);
					const titleWithReversedUsers = getDialogChatTitle(selectedUser, authUser);
					const chats = await chatService.getChats();
					const chatExist = chats.some(
						chat => chat.title === title || chat.title === titleWithReversedUsers
					);
					if (chatExist) {
						const nextState = {
							...this.state,
							values: {
								login: getValueFromRefs(this.refs, 'login'),
							},
							errors: initialState.errors,
						};
						nextState.errors.login = `Диалог с ${selectedUser.login} уже существует`;
						this.setState(nextState);
						return;
					}
					const { id: chatId } = await chatService.createChat({ title });
					await chatService.addChatUsers({ chatId, users: [selectedUser.id] });
					await chatService.getAndSetChats();
					this.closeModal();
					this.destroy();
				}
			},
		};
	}

	render(): string {
		const { errors, values, selectedUser } = this.state;

		// language=hbs
		return `
			<div class="modal-container ${this.state.isOpen ? 'modal-open' : ''}">
				<div class="modal space-y-4">
					<p class="text-center text-xl">Создать диалог</p>
					<form class="space-y-4">
						<div class="flex space-x-2">
							<div class="relative grow">
								{{{Input
									variant="standard-black"
									ref="login"
									name="login"
									label="Логин собеседника"
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
					<div class="submit-container flex-center">
						{{{Button
							text=this.createBtnText
							onClick=onCreate
							disabled=${!selectedUser}
						}}}
					</div>
				</div>
			</div>
		`;
	}
}

export default CreateDialogModal;
