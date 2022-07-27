import { icons } from '@/shared/content';
import { Block } from '@/shared/core';

import type { ButtonProps } from './button.types';

class Button extends Block<ButtonProps> {
	static componentName = 'Button';

	constructor({ onClick, ...props }: ButtonProps & { onClick: () => void }) {
		super({ ...props, events: { click: onClick } });
	}

	render(): string {
		const { text, classes, icon } = this.props;

		if (icon) {
			// language=hbs
			return `
          <button class="btn-icon w-10 h-10">${icons[icon]}</button>
      `;
		}

		// language=hbs
		return `
        <button class="btn ${classes || ''}">${text}</button>
    `;
	}
}

export default Button;
