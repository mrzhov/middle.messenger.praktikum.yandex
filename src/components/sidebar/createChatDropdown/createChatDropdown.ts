import { CreateDialogModal, CreateGroupModal } from '@/components/modals';
import { icons } from '@/shared/content';
import { Block } from '@/shared/core';
import { findParentElementByCondition, openModal } from '@/shared/utils';

const click = (event: MouseEvent) => {
	event.preventDefault();
	const openCreateDialogModalButton = findParentElementByCondition(
		event,
		(target: any) => target.id === 'create-dialog-btn'
	);
	const openCreateGroupModalButton = findParentElementByCondition(
		event,
		(target: any) => target.id === 'create-group-btn'
	);
	if (openCreateDialogModalButton) {
		openModal(CreateDialogModal);
	}
	if (openCreateGroupModalButton) {
		openModal(CreateGroupModal);
	}
};

class CreateChatDropdown extends Block {
	static componentName = 'CreateChatDropdown';

	constructor() {
		super({ events: { click } });
	}

	protected getStateFromProps() {
		this.state = {
			isOpen: false,
			toggleCreateChat: () => {
				this.state.isOpen = !this.state.isOpen;
				const handleDropdownClick = (event: MouseEvent) => {
					const chatActionsDropdown = findParentElementByCondition(
						event,
						(target: any) => target.id === 'create-chat-dropdown'
					);
					if (!chatActionsDropdown) {
						this.closeDropdown();
						window.removeEventListener('click', handleDropdownClick);
					}
				};
				if (this.state.isOpen) {
					window.addEventListener('click', handleDropdownClick);
				} else {
					window.removeEventListener('click', handleDropdownClick);
				}
			},
		};
	}

	closeDropdown() {
		this.state.isOpen = false;
	}

	render(): string {
		const { isOpen } = this.state;
		// language=hbs
		return `
      <div class="dropdown" id="create-chat-dropdown">
				{{{Button
					icon="pencil"
					onClick=toggleCreateChat
				}}}
				<div class="dropdown-content left-0 ${isOpen ? 'dropdown-content-open' : ''}">
					<button class="dropdown-content-btn space-x-2" id="create-dialog-btn">
						${icons.chat}
						<span>Создать диалог</span>
					</button>
					<button class="dropdown-content-btn space-x-2" id="create-group-btn">
						${icons.people}
						<span>Создать группу</span>
					</button>
				</div>
			</div>
    `;
	}
}

export default CreateChatDropdown;
