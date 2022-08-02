import type { RouteBlock } from '@/shared/types';

export type RouteParams = {
	pathname: string;
	view: RouteBlock;
	root: HTMLElement;
};
