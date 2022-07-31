export const queryStringify = (data: Record<string, unknown>) => {
	return `?${Object.entries(data)
		.map(([key, value]) => `${key}=${value}`)
		.join('&')}`;
};
