import { Block } from '@/shared/core';

import type { InputProps } from './input.types';

const getClasses = (variant: InputProps['variant'], error: InputProps['error']) => {
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

class Input extends Block<InputProps> {
	constructor({ variant = 'standard', ...other }: InputProps) {
		super({ variant, ...other });
	}

	render(): string {
		const { type, variant, error } = this.props;
		const classes = getClasses(variant, error);

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
