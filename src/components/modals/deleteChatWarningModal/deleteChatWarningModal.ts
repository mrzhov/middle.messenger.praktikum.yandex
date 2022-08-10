import { store } from '@/app';
import { ChatService } from '@/services';
import { Block } from '@/shared/core';
import { changeRoute, closeModalHandler } from '@/shared/utils';

const initialState = {
	isOpen: false,
};

class DeleteChatWarningModal extends Block {
	static componentName = 'DeleteChatWarningModal';

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
				this.setState({
					currentChat,
				});
			}
		}, 'currentChat');
	}

	protected getStateFromProps() {
		this.state = {
			...initialState,
			onDelete: async (event: MouseEvent) => {
				event.preventDefault();

				const { currentChat } = this.state;

				if (currentChat) {
					const chatId = currentChat.id;
					const chatService = new ChatService();
					await chatService.deleteChat({
						chatId,
					});
					changeRoute('/');
					this.closeModal();
				}
			},
		};
	}

	render(): string {
		const { currentChat } = this.state;
		// language=hbs
		return `
			<div class="modal-container ${this.state.isOpen ? 'modal-open' : ''}">
				<div class="modal space-y-4">
					{{#if this.currentChat}}
						<div>
							<p class="text-center text-xl">Вы действительно хотите удалить этот чат?</p>
							<p class="text-center subtext">${currentChat?.title}</p>
						</div>
						<div class="submit-container flex-center">
							{{{Button
								text="Удалить чат"
								onClick=onDelete
								classes="error"
							}}}
						</div>
					{{else}}
						<div class="h-full flex-center">{{{Loader}}}</div>
					{{/if}}
				</div>
			</div>
		`;
	}
}

export default DeleteChatWarningModal;
