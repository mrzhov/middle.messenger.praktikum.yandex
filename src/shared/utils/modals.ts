import { CreateDialogModal } from '@/components/modals/createDialogModal';
import { CreateGroupModal } from '@/components/modals/createGroupModal';

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
