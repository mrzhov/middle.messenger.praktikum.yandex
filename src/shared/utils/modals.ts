import type { IModal } from '@/shared/types';

export function closeModalHandler<T extends IModal>(this: T, target: Element) {
	if (target.classList.contains('modal-container')) {
		this.closeModal();
		this.destroy();
	}
}

export const openModal = (Component: BlockConstructable) => {
	const modal = new Component({});
	modal.setState({ isOpen: true });
	document.body.append(modal.getContent());
};
