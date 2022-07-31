export enum Methods {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
}

export type RequestHeaders = Record<string, string>;

export type RequestConfig = {
	headers?: RequestHeaders;
};

export type Options = {
	data: any;
} & RequestConfig;
