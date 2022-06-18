import { Block } from '@/shared/core';

import type { InputProps } from './input.types';

class Input extends Block<InputProps> {
	constructor({ classes = 'form-field', ...other }: InputProps) {
		super({ classes, ...other });
	}

	render(): string {
		const { type } = this.props;

		// language=hbs
		return `
      <div class="{{classes}}">
        <input id="{{name}}" type="${type || 'text'}" placeholder="{{label}}" value="{{value}}">
				<label for="{{name}}">{{label}}</label>
				<div class="error">{{#if error}}{{error}}{{/if}}</div>
      </div>
    `;
	}
}

export default Input;
