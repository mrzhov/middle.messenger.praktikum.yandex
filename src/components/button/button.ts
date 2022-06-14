import { Block } from '@/shared/core';

import type { ButtonProps } from './button.types';

class Button extends Block {
	// eslint-disable-next-line @typescript-eslint/no-useless-constructor
	constructor(props: ButtonProps) {
		super(props);
	}

	render(): string {
		// language=hbs
		return `
			<button class="btn">{{text}}</button>
		`;
	}
}

export default Button;
