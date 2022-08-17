import type { Resource } from '@/shared/types';
import { errorHandler } from '@/shared/utils';

import { ResourcesApi } from './resources.api';

export class ResourcesService {
	private resourcesApi: ResourcesApi;

	constructor() {
		this.resourcesApi = new ResourcesApi();
		this.uploadResource = errorHandler(this.uploadResource.bind(this));
	}

	async uploadResource(data: FormData): Promise<Resource> {
		const response = await this.resourcesApi.uploadResource<Resource>(data);
		return response;
	}

	async downloadResource(path: string, filename: string): Promise<void> {
		const blob = await this.resourcesApi.downloadResource<Blob>(path);
		const blobURL = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = blobURL;
		link.download = filename;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}
}
