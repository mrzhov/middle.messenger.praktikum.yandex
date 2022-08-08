import { Toast } from '@/components/toast';
import { Router } from '@/shared/core';

import { omit } from './helpers';

export const findParentElementByCondition = (event: any, condition: (target: any) => boolean) => {
	let { target } = event;
	while (target) {
		if (condition(target)) {
			return target;
		}
		target = target.parentElement;
	}
	return undefined;
};

export const getValueFromRefs = (refs: Record<string, HTMLElement>, field: string) =>
	(refs[field].firstElementChild as HTMLInputElement).value.trim();

export const transformElementAndEvents = (events: any, element: Nullable<HTMLElement>) => {
	const { targetChildElementId } = events;
	return {
		onlyEvents: targetChildElementId ? omit(['targetChildElementId'], events) : events,
		element: targetChildElementId ? element!.querySelector(`#${targetChildElementId}`) : element,
	};
};

export const useParams = () => {
	const router = Router.getInstance();
	if (router.currentRoute) {
		return router.currentRoute.getDynamicParamsObj(window.location.pathname);
	}
	return {};
};

export const openToast = (text: string) => {
	const toast = new Toast({ type: 'error', text });

	document.body.append(toast.getContent());

	setTimeout(() => {
		toast.getContent()!.classList.add('toast-open');
	}, 100);

	setTimeout(() => {
		toast.getContent()!.classList.remove('toast-open');
	}, 3000);

	setTimeout(() => {
		toast.destroy();
	}, 3300);
};

export const numWord = (value: number, words: Array<string>) => {
	const val = Math.abs(value) % 100;
	const num = val % 10;
	if (val > 10 && val < 20) return words[2];
	if (num > 1 && num < 5) return words[1];
	if (num === 1) return words[0];
	return words[2];
};
