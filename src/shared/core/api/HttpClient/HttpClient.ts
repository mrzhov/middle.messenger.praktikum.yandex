import { queryStringify } from '@/shared/utils';

import type { Options, RequestConfig } from './HttpClient.types';
import { Methods } from './HttpClient.types';

const defaultHeaders = {
	'content-type': 'application/json',
};

export class HttpClient {
	private readonly baseURL: string;

	constructor() {
		this.baseURL = process.env.API_URL!;
	}

	get = <T>(url: string, config?: RequestConfig) => {
		const query = config && config.params ? queryStringify(config.params) : '';
		return this.request<T>(`${url}${query}`, Methods.GET, { ...config });
	};

	post = <T>(url: string, data?: any, config?: RequestConfig) => {
		return this.request<T>(url, Methods.POST, { data, ...config });
	};

	put = <T>(url: string, data?: any, config?: RequestConfig) => {
		return this.request<T>(url, Methods.PUT, { data, ...config });
	};

	// delete = (url: string, options: MethodOptions) => {
	// 	return this.request(url, { ...options, method: Methods.DELETE });
	// };

	request = <T>(url: string, method: Methods, options: Options) => {
		const { data, headers } = options;

		return new Promise<T>((resolve, reject) => {
			const xhr = new XMLHttpRequest();

			xhr.open(method, this.baseURL + url);

			xhr.withCredentials = true;

			xhr.onload = () => {
				if (xhr.status >= 200 && xhr.status < 300) {
					const response = xhr.response === 'OK' ? { status: 'OK' } : JSON.parse(xhr.response);
					resolve(response);
				} else {
					const response =
						xhr.response === 'Internal Server Error'
							? { reason: 'Internal Server Error' }
							: JSON.parse(xhr.response);
					reject(response);
				}

				// resolve(xhr);
			};

			xhr.onabort = reject;
			xhr.onerror = reject;
			xhr.ontimeout = reject;

			Object.entries(Object.assign(defaultHeaders, headers)).forEach(([key, value]) => {
				xhr.setRequestHeader(key, value);
			});

			if (method === Methods.GET || !data) {
				xhr.send();
			} else if (data instanceof FormData) {
				xhr.send(data);
			} else {
				xhr.send(JSON.stringify(data));
			}
		});
	};
}
