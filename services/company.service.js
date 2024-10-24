import { tokenService } from './token.service.js';
import { Company } from '../models/company.model.js';

class CompanyService {
	constructor() {
		this.COMPANY_ENDPOINT = 'https://job.jiko-soft.com/company';
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

	// Fetch all company
	async getAllCompanies() {
		try {
			const response = await fetch(this.COMPANY_ENDPOINT, {
				method: 'GET',
				headers: this._getHeadersWithAuth()
			});

			if (!response.ok) throw new Error(`Error: ${response.statusText}`);
			const companiesResponse = await response.json();
			const companies = companiesResponse.map(companyData => new Company(
				companyData.id, 
				companyData.companyName, 
				companyData.legalStatus, 
				companyData.activitySector
			));

			return companies;
		} catch (error) {
			console.error('Unable to fetch company : ', error.message);
		}
	}

	// commentaire test pour push

	// Fetch a company by ID
	async getCompanyById(id) {
		try {
			const response = await fetch(`${this.COMPANY_ENDPOINT}/${id}`, {
				method: 'GET',
				headers: this._getHeadersWithAuth()
			});

			if (!response.ok) throw new Error(`Error: ${response.statusText}`);
			return await response.json();
		} catch (error) {
			console.error('Unable to fetch offer:', error.message);
		}
	}

	// Create a new company
	async createCompany(companyName) {
		try {
			const response = await fetch(this.COMPANY_ENDPOINT, {
				method: 'POST',
				headers: this._getHeadersWithAuth(),
				body: JSON.stringify({ companyName })
			});
			
			if (!response.ok) throw new Error(`Error: ${response.statusText}`);
			return await response.json();
		} catch (error) {
			console.error('Unable to create company : ', error.message);
		}
	}

	// Update a company by ID
	async updateCompany(id, companyName) {
		try {
			const response = await fetch(`${this.COMPANY_ENDPOINT}/${id}`, {
				method: 'PUT',
				headers: this._getHeadersWithAuth(),
				body: JSON.stringify({ companyName })
			});
			
			if (!response.ok) throw new Error(`Error: ${response.statusText}`);
			return await response.json();
		} catch (error) {
			console.error('Unable to update company : ', error.message);
		}
	}

	// Delete a company by ID
	async deleteCompany(id) {
		try {
			const response = await fetch(`${this.COMPANY_ENDPOINT}/${id}`, {
				method: 'DELETE',
				headers: this._getHeadersWithAuth()
			});
			
			if (!response.ok) throw new Error(`Error: ${response.statusText}`);
			return await response.json();
		} catch (error) {
			console.error('Unable to delete company:', error.message);
		}
	}
}

export const companyService = new CompanyService();