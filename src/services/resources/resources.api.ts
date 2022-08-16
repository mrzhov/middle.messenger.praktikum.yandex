import { HttpClient } from '@/shared/core';

export class ResourcesApi {
	private http: HttpClient;

	constructor() {
		this.http = new HttpClient(process.env.RESOURCES_URL);
	}

	uploadResource<T>(data: FormData): Promise<T> {
		return this.http.post<T>('', data);
	}

	downloadResource<T>(path: string): Promise<T> {
		return this.http.get<T>(path, { responseType: 'blob' });
	}
}
