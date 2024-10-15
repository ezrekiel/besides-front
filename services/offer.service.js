import { tokenService } from './token.service.js';

class ResourceService {
	constructor() {
		this.RESOURCE_ENDPOINT = 'https://job.jiko-soft.com/offer';
		this.httpHeaders = {
			'Content-Type': 'application/json',
		};
	}

	_getHeadersWithAuth() {
		const token = tokenService.getToken();
		return {
			...this.httpHeaders,
			Authorization: `Bearer ${token}`
		};
	}

	// Fetch all resources
	async getAllResources() {
		try {
			const response = await fetch(this.RESOURCE_ENDPOINT, {
				method: 'GET',
				headers: this._getHeadersWithAuth()
			});
			
			if (!response.ok) throw new Error(`Error: ${response.statusText}`);
			return await response.json();
		} catch (error) {
			console.error('Unable to fetch resources:', error.message);
		}
	}

	// Fetch a resource by ID
	async getResourceById(resourceID) {
		try {
			const response = await fetch(`${this.RESOURCE_ENDPOINT}/${resourceID}`, {
				method: 'GET',
				headers: this._getHeadersWithAuth()
			});

			if (!response.ok) throw new Error(`Error: ${response.statusText}`);
			return await response.json();
		} catch (error) {
			console.error('Unable to fetch resource:', error.message);
		}
	}

	// Create a new resource
	async createResource(resourceName) {
		try {
			const response = await fetch(this.RESOURCE_ENDPOINT, {
				method: 'POST',
				headers: this._getHeadersWithAuth(),
				body: JSON.stringify({ resourceName })
			});
			
			if (!response.ok) throw new Error(`Error: ${response.statusText}`);
			return await response.json();
		} catch (error) {
			console.error('Unable to create resource:', error.message);
		}
	}

	// Update a resource by ID
	async updateResource(resourceID, resourceName) {
		try {
			const response = await fetch(`${this.RESOURCE_ENDPOINT}/${resourceID}`, {
				method: 'PUT',
				headers: this._getHeadersWithAuth(),
				body: JSON.stringify({ resourceName })
			});
			
			if (!response.ok) throw new Error(`Error: ${response.statusText}`);
			return await response.json();
		} catch (error) {
			console.error('Unable to update resource:', error.message);
		}
	}

	// Delete a resource by ID
	async deleteResource(resourceID) {
		try {
			const response = await fetch(`${this.RESOURCE_ENDPOINT}/${resourceID}`, {
				method: 'DELETE',
				headers: this._getHeadersWithAuth()
			});
			
			if (!response.ok) throw new Error(`Error: ${response.statusText}`);
			return await response.json();
		} catch (error) {
			console.error('Unable to delete resource:', error.message);
		}
	}
}

export const resourceService = new ResourceService();
