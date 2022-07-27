export enum Methods {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
}

export type Options = {
	timeout: number;
	headers: Record<string, string>;
	data: any;
	method: Methods;
};
