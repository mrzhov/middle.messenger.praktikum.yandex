import type { Block } from '@/shared/core';

export interface IModal extends Block {
	closeModal: () => void;
}
