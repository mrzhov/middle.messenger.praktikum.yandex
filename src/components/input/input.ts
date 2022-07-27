import { Block } from '@/shared/core';

import type { InputProps, InputVariant } from './input.types';

const getClasses = (error: InputProps['error'], variant?: InputVariant) => {
	if (variant === 'standard') {
		return `input-standard${error ? ' input-standard-error' : ''}`;
	}
	if (variant === 'gradient') {
		return `input-gradient${error ? ' input-gradient-error' : ''}`;
	}
	if (variant === 'chat-message') {
		return `input-chat-message${error ? ' input-chat-message-error' : ''}`;
	}
	return '';
};

class Input extends Block<Omit<InputProps, 'onFocus' | 'onBlur'>> {
	static componentName = 'Input';

	constructor({ variant = 'standard', onFocus, onBlur, ...other }: Omit<InputProps, 'events'>) {
		super({
			...other,
			variant,
			events: { focus: onFocus, blur: onBlur, targetChildElementId: other.name },
		});
	}

	render(): string {
		const { type, variant, error } = this.props;
		const classes = getClasses(error, variant);

		// language=hbs
		return `
      <div class="${classes}">
        <input id="{{name}}" type="${type || 'text'}" placeholder="{{label}}" value="{{value}}">
				<label for="{{name}}">{{label}}</label>
				{{#if error}}
					<div class="form-field-error-message">{{error}}</div>
				{{/if}}
      </div>
    `;
	}
}

export default Input;
