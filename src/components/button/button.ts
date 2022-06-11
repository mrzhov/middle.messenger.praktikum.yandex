import { Block } from '@/shared/core';

import type { ButtonProps } from './button.types';

class Button extends Block {
	constructor({ text, onClick }: ButtonProps) {
		super({ text, events: { click: onClick } });
	}

	render(): string {
		// language=hbs
		return `
			<button class="btn">{{text}}</button>
		`;
	}
}

export default Button;
