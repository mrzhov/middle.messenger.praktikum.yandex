import { CreateDialogModal } from '@/components/modals/createDialogModal';
import { CreateGroupModal } from '@/components/modals/createGroupModal';
import type { IModal } from '@/shared/types';

import AddChatUsersModal from '../../components/modals/addChatUsersModal/addChatUsersModal';
import DeleteChatWarningModal from '../../components/modals/deleteChatWarningModal/deleteChatWarningModal';

export function closeModalHandler<T extends IModal>(this: T, target: Element) {
	if (target.classList.contains('modal-container')) {
		this.closeModal();
		this.destroy();
	}
}

export const openCreateDialogModal = () => {
	const createDialogModal = new CreateDialogModal();
	createDialogModal.setState({ isOpen: true });
	document.body.append(createDialogModal.getContent());
};

export const openCreateGroupModal = () => {
	const createGroupModal = new CreateGroupModal();
	createGroupModal.setState({ isOpen: true });
	document.body.append(createGroupModal.getContent());
};

export const openDeleteChatWarningModal = () => {
	const deleteChatWarningModal = new DeleteChatWarningModal();
	deleteChatWarningModal.setState({ isOpen: true });
	document.body.append(deleteChatWarningModal.getContent());
};

export const openAddChatUsersModal = () => {
	const addChatUsersModal = new AddChatUsersModal();
	addChatUsersModal.setState({ isOpen: true });
	document.body.append(addChatUsersModal.getContent());
};
