import { store } from '@/app';
import { Block } from '@/shared/core';
import { blurHandler, focusHandler, getValueFromRefs } from '@/shared/utils';
import { messageValidator } from '@/shared/validators';

async function inputOnChangeHandler(this: any) {
	const { files } = this;
	const file = files ? files[0] : null;
	if (file) {
		const formData = new FormData();
		formData.append('resource', file);
		const { messageService } = store.getState();
		if (messageService) {
			await messageService.sendResourceMessage(formData);
		}
	}
}

const initialState = {
	values: {
		message: '',
	},
	errors: {
		message: '',
	},
};

class ChatBottomActions extends Block {
	static componentName = 'ChatBottomActions';

	constructor() {
		super();
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
			onSubmit: (event: MouseEvent) => {
				event.preventDefault();

				const chatData = {
					message: getValueFromRefs(this.refs, 'message'),
				};

				const nextState = {
					values: { ...chatData },
					errors: initialState.errors,
				};

				nextState.errors.message = messageValidator(chatData.message);

				this.setState(nextState);

				if (Object.values(nextState.errors).every(e => !e)) {
					const { messageService } = store.getState();
					if (messageService) {
						messageService.sendMessage(chatData);
					}
					this.setState(initialState);
				}
			},
			openChatAttachments: () => {
				const input = document.createElement('input');
				input.type = 'file';
				input.onchange = inputOnChangeHandler;
				input.click();
			},
		};
	}

	render(): string {
		const { errors, values } = this.state;

		// language=hbs
		return `
      <div class="chat-actions">
				<div class="flex items-center h-full px-4">
					{{{Button
						icon="staple"
						onClick=openChatAttachments
					}}}
					<div class="grow h-full">
						<form>
							{{{Input
								variant="chat-message"
								ref="message"
								name="message"
								label="Сообщение..."
								value="${values.message}"
								error="${errors.message}"
								onFocus=onFocusHandler
								onBlur=onBlurHandler
							}}}
							{{{Button
								icon="send"
								onClick=onSubmit
								type="submit"
							}}}
						</form>
					</div>
				</div>
			</div>
    `;
	}
}

export default ChatBottomActions;
