import { ChatService } from '@/services';
import { Block } from '@/shared/core';
import { blurHandler, focusHandler, getValueFromRefs } from '@/shared/utils';
import { requiredValidator } from '@/shared/validators/required';

const initialState = {
	values: {
		isOpen: false,
		title: '',
	},
	errors: {
		title: '',
	},
};

class CreateChatModal extends Block {
	static componentName = 'CreateChatModal';

	constructor() {
		super({
			events: {
				click: (event: MouseEvent) => {
					event.preventDefault();
					const target = event.target as Element;
					if (target.classList.contains('modal-container')) {
						this.closeModal();
						this.destroy();
					}
				},
			},
		});
	}

	closeModal() {
		this.state.isOpen = false;
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
			onSubmit: async (event: MouseEvent) => {
				event.preventDefault();

				const createChatData = {
					title: getValueFromRefs(this.refs, 'title'),
				};

				const nextState = {
					values: { ...createChatData },
					errors: initialState.errors,
				};

				nextState.errors.title = requiredValidator(createChatData.title);

				this.setState(nextState);

				if (Object.values(nextState.errors).every(e => !e)) {
					const chatService = new ChatService();
					await chatService.createChat({
						title: createChatData.title,
					});
					this.closeModal();
					this.setState(initialState);
				}
			},
		};
	}

	render(): string {
		const { errors, values } = this.state;

		// language=hbs
		return `
			<div class="modal-container ${this.state.isOpen ? 'modal-open' : ''}">
				<div class="modal space-y-4">
					<p class="text-center text-xl">Создать чат</p>
					<form class="space-y-4">
						{{{Input
							variant="standard-black"
							ref="title"
							name="title"
							label="Название чата"
							value="${values.title}"
							error="${errors.title}"
							onFocus=onFocusHandler
							onBlur=onBlurHandler
						}}}
						<div class="submit-container flex-center">
							{{{Button
								text="Создать"
								onClick=onSubmit
							}}}
						</div>
					</form>
				</div>
			</div>
		`;
	}
}

export default CreateChatModal;