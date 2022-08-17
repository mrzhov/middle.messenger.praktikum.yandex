import { Toast } from '@/components/toast';
import type { WeeksKeys } from '@/shared/content';
import { weeks } from '@/shared/content';
import { Router } from '@/shared/core';
import type { User } from '@/shared/types';

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

export const getDialogChatTitle = (user1: User, user2: User) => {
	const user1FullName = `${user1.first_name} ${user1.second_name}`;
	const user2FullName = `${user2.first_name} ${user2.second_name}`;
	return `Диалог ${user1FullName} и ${user2FullName}`;
};

const addZeroChat = (value: number) => (value > 9 ? value : `0${value}`);

export const toTimeTransformer = (dateTime: string) => {
	const date = new Date(dateTime);
	const hours = date.getHours();
	const minutes = date.getMinutes();
	return `${addZeroChat(hours)}:${addZeroChat(minutes)}`;
};

export const dateTimeTransformer = (dateTime: string) => {
	const date = new Date(dateTime);
	const currDate = new Date();
	const diff = new Date(currDate.getTime() - date.getTime());
	const diffInDays = Math.floor(diff.getTime() / (24 * 3600 * 1000));
	if (diffInDays > 0) {
		if (diffInDays > 7) {
			const day = date.getDate();
			const month = date.getMonth() + 1;
			const year = String(date.getFullYear()).slice(2);
			return `${day}.${addZeroChat(month)}.${year}`;
		}
		return weeks[date.getDay() as WeeksKeys];
	}
	return toTimeTransformer(dateTime);
};

export const formatBytes = (bytes: number, decimals = 2) => {
	if (bytes === 0) return '0 Байт';

	const k = 1024;
	const dm = decimals < 0 ? 0 : decimals;
	const sizes = ['Байт', 'КБ', 'МБ', 'ГБ', 'ТБ', 'ПБ', 'ЭБ', 'ЗБ', 'ЙБ'];

	const i = Math.floor(Math.log(bytes) / Math.log(k));

	return `${parseFloat((bytes / k ** i).toFixed(dm))} ${sizes[i]}`;
};
