import { Router } from '@/app/routing';

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

export const omit = <T>(keys: Array<string>, obj: T) =>
	Object.fromEntries<T>(Object.entries(obj).filter(([k]) => !keys.includes(k)));

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
