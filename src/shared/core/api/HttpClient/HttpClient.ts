import { queryStringify } from '@/shared/utils';

import type { Options, RequestConfig } from './HttpClient.types';
import { Methods } from './HttpClient.types';

export class HttpClient {
	private readonly baseURL: string;

	constructor(baseUrl?: string) {
		this.baseURL = baseUrl || process.env.API_URL!;
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

	delete = <T>(url: string, data?: any, config?: RequestConfig) => {
		return this.request<T>(url, Methods.DELETE, { data, ...config });
	};

	request = <T>(url: string, method: Methods, options: Options) => {
		const { data, headers, responseType } = options;

		return new Promise<T>((resolve, reject) => {
			const xhr = new XMLHttpRequest();

			xhr.open(method, this.baseURL + url);

			xhr.withCredentials = true;

			if (responseType) {
				xhr.responseType = responseType;
			}

			xhr.onload = () => {
				if (xhr.status >= 200 && xhr.status < 300) {
					try {
						const response =
							xhr.response === 'OK' ? { status: 'OK' } : JSON.parse(xhr.response);
						resolve(response);
					} catch (err: any) {
						resolve(xhr.response);
					}
				} else {
					const response =
						xhr.response === 'Internal Server Error'
							? { reason: 'Внутренняя ошибка, повторите позже' }
							: JSON.parse(xhr.response);
					reject(response);
				}
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
			} else if (data instanceof FormData) {
				xhr.send(data);
			} else {
				xhr.setRequestHeader('content-type', 'application/json');
				xhr.send(JSON.stringify(data));
			}
		});
	};
}
