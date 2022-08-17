import { Block } from '@/shared/core';

import type { ToastProps } from './toast.types';

class Toast extends Block<ToastProps> {
	static componentName = 'Toast';

	constructor(props: ToastProps) {
		super(props);
	}

	render(): string {
		const { text, type } = this.props;

		// language=hbs
		return `
			<div class="toast toast-${type}">
				<p class="toast-text">${text}</p>
			</div>
		`;
	}
}

export default Toast;
