import { Toast } from '@/components/toast';

export const errorHandler = (original: (...args: any) => Promise<any>) => {
	return async (...args: any) => {
		try {
			return await original(...args);
		} catch (error: any) {
			const toast = new Toast({ type: 'error', text: error.reason });

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

			return undefined;
		}
	};
};
