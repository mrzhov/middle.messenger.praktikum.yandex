import { icons } from '@/shared/content';
import { Block } from '@/shared/core';
import { findParentElementByCondition } from '@/shared/utils';

const click = (event: MouseEvent) => {
	event.preventDefault();
	const openAddPeopleModalButton = findParentElementByCondition(
		event,
		(target: any) => target.id === 'add-people-btn'
	);
	const openRemovePeopleModalButton = findParentElementByCondition(
		event,
		(target: any) => target.id === 'remove-people-btn'
	);
	if (openAddPeopleModalButton) {
		console.log('Открыть модальное окно "Добавить участников"');
	}
	if (openRemovePeopleModalButton) {
		console.log('Открыть модальное окно "Удалить участников"');
	}
};

class ChatActionsDropdown extends Block {
	static componentName = 'ChatActionsDropdown';

	constructor() {
		super({ events: { click } });
	}

	protected getStateFromProps() {
		this.state = {
			isOpen: false,
			toggleChatActions: () => {
				this.state.isOpen = !this.state.isOpen;
				const handleDropdownClick = (event: MouseEvent) => {
					const chatActionsDropdown = findParentElementByCondition(
						event,
						(target: any) => target.id === 'chat-actions-dropdown'
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
      <div class="dropdown" id="chat-actions-dropdown">
				{{{Button
					icon="dots"
					onClick=toggleChatActions
				}}}
				<div class="dropdown-content right-0 ${isOpen ? 'dropdown-content-open' : ''}">
					<button class="space-x-2" id="add-people-btn">
						${icons.people}
						<span>Добавить участников</span>
					</button>
					<button class="space-x-2" id="remove-people-btn">
						${icons.removePeople}
						<span>Удалить участников</span>
					</button>
				</div>
			</div>
    `;
	}
}

export default ChatActionsDropdown;
