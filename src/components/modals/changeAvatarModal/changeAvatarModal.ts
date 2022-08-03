import { Block } from '@/shared/core';

class ChangeAvatarModal extends Block {
	static componentName = 'ChangeAvatarModal';

	constructor() {
		super();
	}

	protected getStateFromProps() {
		this.state = {
			isOpen: false,
		};
	}

	render(): string {
		// language=hbs
		return `
			<div class="modal-container ${this.state.isOpen ? 'modal-open' : ''}">
				<div class="modal">
					Modal content
				</div>
			</div>
		`;
	}
}

export default ChangeAvatarModal;
