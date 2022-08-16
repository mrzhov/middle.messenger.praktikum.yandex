export enum Methods {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
}

export type RequestConfig = {
	headers?: Record<string, string>;
	params?: Record<string, unknown>;
	responseType?: 'blob';
};

export type Options = {
	data?: any;
} & RequestConfig;
