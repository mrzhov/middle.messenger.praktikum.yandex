import type Block from '../Block';

export function renderComponent(container: HTMLElement, component: Block) {
	container.innerHTML = '';

	if (component.element) {
		container.appendChild(component.getContent());
	}
}
