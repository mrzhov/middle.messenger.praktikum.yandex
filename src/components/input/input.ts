import { Block } from '@/shared/core';

import type { InputProps } from './input.types';

class Input extends Block<InputProps> {
	constructor(props: InputProps) {
		super(props);
	}

	render(): string {
		const { name, label, type } = this.props;

		// language=hbs
		return `
      <div class="auth-form-field">
        <input id="${name}" type="${type || 'text'}" placeholder="${label}" value="{{value}}">
				<label for="${name}">${label}</label>
				<div class="error">{{#if error}}{{error}}{{/if}}</div>
      </div>
    `;
	}
}

export default Input;
