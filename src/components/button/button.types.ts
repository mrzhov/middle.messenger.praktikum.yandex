import type { IconsKeys } from '@/shared/content';

export type ButtonProps = {
	text: string;
	classes?: string;
	onClick: () => void;
	icon?: IconsKeys;
} & BlockEvents;
