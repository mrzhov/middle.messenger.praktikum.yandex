export enum Methods {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
}

export type RequestConfig = {
	headers?: Record<string, string>;
	params?: Record<string, unknown>;
};

export type Options = {
	data?: any;
} & RequestConfig;
