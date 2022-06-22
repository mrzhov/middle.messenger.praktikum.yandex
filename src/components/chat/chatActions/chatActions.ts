import { icons } from '@/shared/content';
import { Block } from '@/shared/core';
import { blurHandler, focusHandler, getValueFromRefs } from '@/shared/utils';
import { messageValidator } from '@/shared/validators';

const initialState = {
	values: {
		message: '',
	},
	errors: {
		message: '',
	},
};

class ChatActions extends Block {
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
					console.log('message:', chatData);
					this.setState(initialState);
				}
			},
		};
	}

	render(): string {
		const { errors, values } = this.state;

		// language=hbs
		return `
      <div class="chat-actions">
				<div class="flex items-center h-full">
					<button class="btn-icon">${icons.staple}</button>
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
							}}}
						</form>
					</div>
				</div>
			</div>
    `;
	}
}

export default ChatActions;
