import type { IconsKeys } from '@/shared/content';

export type ButtonProps = {
	text: string;
	classes?: string;
	icon?: IconsKeys;
	disabled?: boolean;
} & BlockEvents;
