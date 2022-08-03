import { ChangeAvatarModal } from '@/components/modals/changeAvatarModal';

export const openChangeAvatarModal = () => {
	const changeAvatarModal = new ChangeAvatarModal();

	document.body.append(changeAvatarModal.getContent());

	setTimeout(() => {
		changeAvatarModal.setState({ isOpen: true });
	}, 100);
};
