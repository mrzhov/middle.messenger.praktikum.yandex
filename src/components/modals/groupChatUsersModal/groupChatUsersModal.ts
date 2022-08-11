import { store } from '@/app';
import { Block } from '@/shared/core';
import { closeModalHandler } from '@/shared/utils';

const initialState = {
	isOpen: false,
	chatUsers: null,
};

class GroupChatUsersModal extends Block {
	static componentName = 'GroupChatUsersModal';

	constructor() {
		super({
			events: {
				click: (event: MouseEvent) => {
					event.preventDefault();
					const target = event.target as Element;
					closeModalHandler.call(this, target);
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
				const chatUsers = currentChat.users;
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
		};
	}

	render(): string {
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
						<p class="text-center text-xl">Участники группы</p>
						<div class="chips-container">
							{{#if this.chatUsers}}
								{{#each this.chatUsers}}
									<div class="chip">
										<p class="text">{{this.login}}</p>
									</div>
								{{/each}}
							{{else}}
								{{{Loader}}}
							{{/if}}
						</div>
					</div>
				</div>
			</div>
		`;
	}
}

export default GroupChatUsersModal;
