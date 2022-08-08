import { openToast } from '@/shared/utils/shared';

export const queryStringify = (data: Record<string, unknown>) => {
	return `?${Object.entries(data)
		.map(([key, value]) => `${key}=${value}`)
		.join('&')}`;
};

export const errorHandler = (original: (...args: any) => Promise<any>) => {
	return async (...args: any) => {
		try {
			return await original(...args);
		} catch (error: any) {
			openToast(error.reason);
			return undefined;
		}
	};
};
