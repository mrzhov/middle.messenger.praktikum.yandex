enum METHODS {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
}

type Options = {
	timeout: number;
	headers: Record<string, string>;
	data: any;
	method: METHODS;
};

function queryStringify(data: Options['data']) {
	return `?${Object.entries(data)
		.map(([key, value]) => `${key}=${value}`)
		.join('&')}`;
}

class HTTPBaseService {
	get = (url: string, options: Omit<Options, 'method'>) => {
		const query = queryStringify(options.data);
		return this.request(`${url}${query}`, { ...options, method: METHODS.GET });
	};

	post = (url: string, options: Omit<Options, 'method'>) => {
		return this.request(url, { ...options, method: METHODS.POST });
	};

	put = (url: string, options: Omit<Options, 'method'>) => {
		return this.request(url, { ...options, method: METHODS.PUT });
	};

	delete = (url: string, options: Omit<Options, 'method'>) => {
		return this.request(url, { ...options, method: METHODS.DELETE });
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

			if (method === METHODS.GET || !data) {
				xhr.send();
			} else {
				xhr.send(data);
			}
		});
	};
}

export default HTTPBaseService;
