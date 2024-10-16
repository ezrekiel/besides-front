import { tokenService } from './token.service.js';

class OfferService {
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

	// Fetch all offer
	async getAllOffers() {
		try {
			const response = await fetch(this.RESOURCE_ENDPOINT, {
				method: 'GET',
				headers: this._getHeadersWithAuth()
			});
			
			if (!response.ok) throw new Error(`Error: ${response.statusText}`);
			return await response.json();
		} catch (error) {
			console.error('Unable to fetch offer:', error.message);
		}
	}

	// Fetch a offer by ID
	async getOfferById(offerID) {
		try {
			const response = await fetch(`${this.RESOURCE_ENDPOINT}/${offerID}`, {
				method: 'GET',
				headers: this._getHeadersWithAuth()
			});

			if (!response.ok) throw new Error(`Error: ${response.statusText}`);
			return await response.json();
		} catch (error) {
			console.error('Unable to fetch offer:', error.message);
		}
	}

	// Create a new offer
	async createOffer(offerName) {
		try {
			const response = await fetch(this.RESOURCE_ENDPOINT, {
				method: 'POST',
				headers: this._getHeadersWithAuth(),
				body: JSON.stringify({ offerName })
			});
			
			if (!response.ok) throw new Error(`Error: ${response.statusText}`);
			return await response.json();
		} catch (error) {
			console.error('Unable to create offer:', error.message);
		}
	}

	// Update a offer by ID
	async updateOffer(offerID, offerName) {
		try {
			const response = await fetch(`${this.RESOURCE_ENDPOINT}/${offerID}`, {
				method: 'PUT',
				headers: this._getHeadersWithAuth(),
				body: JSON.stringify({ offerName })
			});
			
			if (!response.ok) throw new Error(`Error: ${response.statusText}`);
			return await response.json();
		} catch (error) {
			console.error('Unable to update offer:', error.message);
		}
	}

	// Delete a offer by ID
	async deleteOffer(offerID) {
		try {
			const response = await fetch(`${this.RESOURCE_ENDPOINT}/${offerID}`, {
				method: 'DELETE',
				headers: this._getHeadersWithAuth()
			});
			
			if (!response.ok) throw new Error(`Error: ${response.statusText}`);
			return await response.json();
		} catch (error) {
			console.error('Unable to delete offer:', error.message);
		}
	}
}

export const offerService = new OfferService();
