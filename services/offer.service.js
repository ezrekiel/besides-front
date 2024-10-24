import { tokenService } from './token.service.js';
import { Offer } from '../models/offer.model.js';

class OfferService {
	constructor() {
		this.OFFER_ENDPOINT = 'https://job.jiko-soft.com/offer';
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
			const response = await fetch(this.OFFER_ENDPOINT, {
				method: 'GET',
				headers: this._getHeadersWithAuth()
			});

			if (!response.ok) throw new Error(`Error: ${response.statusText}`);
			const offersResponse = await response.json();
			const offers = offersResponse.map(offerData => new Offer(
				offerData.offerID, 
				offerData.title, 
				offerData.companyName, 
				offerData.libelle, 
				offerData.postedAt, 
				offerData.jobType, 
				offerData.workingTime, 
				offerData.contractType, 
				offerData.salary, 
				offerData.adress, 
				offerData.zipCode, 
				offerData.country, 
				offerData.city
			));

			return offers;
		} catch (error) {
			console.error('Unable to fetch offer:', error.message);
		}
	}

	// Fetch a offer by ID
	async getOfferById(offerID) {
		try {
			const response = await fetch(`${this.OFFER_ENDPOINT}/${offerID}`, {
				method: 'GET',
				headers: this._getHeadersWithAuth()
			});

			if (!response.ok) throw new Error(`Error: ${response.statusText}`);
			return await response.json();
		} catch (error) {
			console.error('Unable to fetch offer:', error.message);
		}
	}

	async getOffersByTitle(offerTitle) {
		try {
			const response = await fetch(`${this.OFFER_ENDPOINT}/title/${offerTitle}`, {
				method: 'GET',
				headers: this._getHeadersWithAuth()
			});

			if (!response.ok) throw new Error(`Error: ${response.statusText}`);
			return await response.json();
		} catch (error) {
			console.error('Unable to fetch offer:', error.message);
		}
	}

	async getOffersBySearch(searchTerm) {
		try {
			const response = await fetch(`${this.OFFER_ENDPOINT}/search?query=${encodeURIComponent(searchTerm)}`, {
				method: 'GET',
				headers: this._getHeadersWithAuth()
			});
	
			if (!response.ok) throw new Error(`Error: ${response.statusText}`);
			return await response.json();
		} catch (error) {
			console.error('Unable to fetch offers:', error.message);
		}
	}
	

	// Create a new offer
	async createOffer(offerName) {
		try {
			const response = await fetch(this.OFFER_ENDPOINT, {
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
			const response = await fetch(`${this.OFFER_ENDPOINT}/${offerID}`, {
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
			const response = await fetch(`${this.OFFER_ENDPOINT}/${offerID}`, {
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
