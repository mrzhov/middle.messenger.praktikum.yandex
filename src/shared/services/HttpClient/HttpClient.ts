import type { Options, RequestConfig } from './HttpClient.types';
import { Methods } from './HttpClient.types';

const defaultHeaders = {
	'Content-type': 'application/json',
};

export class HttpClient {
	private readonly baseURL: string;

	constructor() {
		this.baseURL = process.env.API_URL!;
	}

	// get = (url: string, options: MethodOptions) => {
	// 	const query = queryStringify(options.data);
	// 	return this.request(`${url}${query}`, { ...options, method: Methods.GET });
	// };

	post = (url: string, data: any, config?: RequestConfig) => {
		return this.request(url, Methods.POST, { data, ...config });
	};

	// put = (url: string, options: MethodOptions) => {
	// 	return this.request(url, { ...options, method: Methods.PUT });
	// };
	//
	// delete = (url: string, options: MethodOptions) => {
	// 	return this.request(url, { ...options, method: Methods.DELETE });
	// };

	request = (url: string, method: Methods, options: Options) => {
		const { data, headers } = options;

		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();
			xhr.open(method, this.baseURL + url);

			xhr.onload = () => {
				const response: any = JSON.parse(xhr.response);

				if (xhr.status >= 200 && xhr.status < 300) {
					resolve(response);
				} else {
					reject(response);
				}

				resolve(xhr);
			};

			xhr.onabort = reject;
			xhr.onerror = reject;
			xhr.ontimeout = reject;

			Object.entries(Object.assign(defaultHeaders, headers)).forEach(([key, value]) => {
				xhr.setRequestHeader(key, value);
			});

			if (method === Methods.GET || !data) {
				xhr.send();
			} else {
				xhr.send(JSON.stringify(data));
			}
		});
	};
}
