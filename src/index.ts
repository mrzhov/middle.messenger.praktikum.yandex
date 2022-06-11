import { Button } from '@/components/button';
import { renderDOM } from '@/shared/core';

document.addEventListener('DOMContentLoaded', () => {
	const button = new Button({
		text: 'Click me',
		onClick: () => {},
	});

	setTimeout(() => {
		button.setProps({
			text: 'Click me please',
		});
	}, 1000);

	renderDOM(button);
});
