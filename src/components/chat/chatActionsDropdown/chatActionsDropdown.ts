import {
	AddChatUsersModal,
	DeleteChatUsersModal,
	DeleteChatWarningModal,
} from '@/components/modals';
import { icons } from '@/shared/content';
import { Block } from '@/shared/core';
import { findParentElementByCondition, openModal } from '@/shared/utils';

import type { ChatActionsDropdownProps } from './chatActionsDropdown.types';

const click = (event: MouseEvent) => {
	event.preventDefault();
	const openAddChatUsersModalButton = findParentElementByCondition(
		event,
		(target: any) => target.id === 'add-people-btn'
	);
	const openDeleteChatUsersModalButton = findParentElementByCondition(
		event,
		(target: any) => target.id === 'remove-people-btn'
	);
	const openDeleteChatWarningModalButton = findParentElementByCondition(
		event,
		(target: any) => target.id === 'delete-chat-btn'
	);
	if (openAddChatUsersModalButton) {
		openModal(AddChatUsersModal);
	}
	if (openDeleteChatUsersModalButton) {
		openModal(DeleteChatUsersModal);
	}
	if (openDeleteChatWarningModalButton) {
		openModal(DeleteChatWarningModal);
	}
};

class ChatActionsDropdown extends Block<ChatActionsDropdownProps<boolean>> {
	static componentName = 'ChatActionsDropdown';

	constructor(props: ChatActionsDropdownProps<StringBoolean>) {
		const transformedProps = {
			authUserIsAdmin: props.authUserIsAdmin === 'true',
			isDialogChat: props.isDialogChat === 'true',
		};
		super({ ...transformedProps, events: { click } });
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
					{{#unless this.isDialogChat}}
						{{#if this.authUserIsAdmin}}
							<button class="dropdown-content-btn space-x-2" id="add-people-btn">
								${icons.people}
								<span>Добавить участников</span>
							</button>
							<button class="dropdown-content-btn space-x-2" id="remove-people-btn">
								${icons.removePeople}
								<span>Удалить участников</span>
							</button>
						{{/if}}
					{{/unless}}
					<button class="dropdown-content-btn color-red space-x-2 " id="delete-chat-btn">
						${icons.trash}
						<span>Удалить чат</span>
					</button>
				</div>
			</div>
    `;
	}
}

export default ChatActionsDropdown;