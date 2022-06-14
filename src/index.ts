import { Button } from '@/components/button';
import { registerComponent, renderDOM } from '@/shared/core';

registerComponent(Button);

document.addEventListener('DOMContentLoaded', () => {
	const button = new Button({
		text: 'Click me',
		events: {
			click: () => {
				console.log('check');
			},
		},
	});

	setTimeout(() => {
		button.setProps({
			text: 'Click me please',
			events: {
				click: () => {
					console.log('check 123');
				},
			},
		});
	}, 1000);

	renderDOM(button);
});
