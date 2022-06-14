import { Block } from '@/shared/core';

import type { ButtonProps } from './button.types';

class Button extends Block {
	constructor(props: ButtonProps) {
		super(props);
	}

	render(): string {
		const { text } = this.props;

		// language=hbs
		return `
			<button class="btn">${text}</button>
		`;
	}
}

export default Button;
