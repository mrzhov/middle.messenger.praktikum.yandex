import { Block } from '@/shared/core';

import type { ButtonProps } from './button.types';

class Button extends Block {
	constructor({ onClick, ...props }: ButtonProps) {
		super({ events: { click: onClick }, ...props });
	}

	render(): string {
		const { text, classes } = this.props;

		// language=hbs
		return `
			<button class="btn ${classes || ''}">${text}</button>
		`;
	}
}

export default Button;
