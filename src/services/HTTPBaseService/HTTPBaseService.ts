import type { Options } from './HTTPBaseService.types';
import { Methods } from './HTTPBaseService.types';

function queryStringify(data: Options['data']) {
	return `?${Object.entries(data)
		.map(([key, value]) => `${key}=${value}`)
		.join('&')}`;
}

class HTTPBaseService {
	get = (url: string, options: Omit<Options, 'method'>) => {
		const query = queryStringify(options.data);
		return this.request(`${url}${query}`, { ...options, method: Methods.GET });
	};

	post = (url: string, options: Omit<Options, 'method'>) => {
		return this.request(url, { ...options, method: Methods.POST });
	};

	put = (url: string, options: Omit<Options, 'method'>) => {
		return this.request(url, { ...options, method: Methods.PUT });
	};

	delete = (url: string, options: Omit<Options, 'method'>) => {
		return this.request(url, { ...options, method: Methods.DELETE });
	};

	request = (url: string, options: Options) => {
		const { method, headers, data, timeout = 5000 } = options;

		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.open(method, url);

			xhr.timeout = timeout;

			xhr.onload = () => {
				resolve(xhr);
			};

			xhr.onabort = reject;
			xhr.onerror = reject;
			xhr.ontimeout = reject;

			if (headers) {
				Object.entries(headers).forEach(([key, value]) => {
					xhr.setRequestHeader(key, value);
				});
			}

			if (method === Methods.GET || !data) {
				xhr.send();
			} else {
				xhr.send(data);
			}
		});
	};
}

export default HTTPBaseService;
