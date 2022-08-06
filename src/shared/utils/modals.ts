import { CreateChatModal } from '@/components/modals/createChatModal';

export const openCreateChatModal = () => {
	const createChatModal = new CreateChatModal();
	createChatModal.setState({ isOpen: true });
	document.body.append(createChatModal.getContent());
};
