import { User } from '../models/user.model.js';
import { tokenService } from './token.service.js';

class UserService {
	constructor() {
		this.USER_ENDPOINT = 'https://job.jiko-soft.com/user';
		this.httpHeaders = {
			'Content-Type': 'application/json',
		};
		this.USER_KEY = 'user';
	}

	setUser(user) {
		window.sessionStorage.removeItem(this.USER_KEY);
		window.sessionStorage.setItem(this.USER_KEY, user);
	}
	
	getUser() {
		return window.sessionStorage.getItem(this.USER_KEY) ?? '';
	}

	destroySession() {
		window.sessionStorage.removeItem(this.USER_KEY);
	}

	_getHeadersWithAuth() {
		const token = tokenService.getToken();
		return {
			...this.httpHeaders,
			Authorization: `Bearer ${token}`
		};
	}

	// Fetch all Users
	async getAllUsers() {
		try {
			const response = await fetch(this.USER_ENDPOINT, {
				method: 'GET',
				headers: this._getHeadersWithAuth()
			});
			
			if (!response.ok) throw new Error(`Error: ${response.statusText}`);
			const usersResponse = await response.json();
			const users = usersResponse.map(userData => new User(
				userData.userID,
				userData.firstname,
				userData.lastname,
				userData.username
			));

			return users;
		} catch (error) {
			console.error('Unable to fetch User:', error.message);
		}
	}

	// Fetch a User by ID
	async getUserById(userID) {
		try {
			const response = await fetch(`${this.USER_ENDPOINT}/${userID}`, {
				method: 'GET',
				headers: this._getHeadersWithAuth()
			});

			if (!response.ok) throw new Error(`Error: ${response.statusText}`);
			return await response.json();
		} catch (error) {
			console.error('Unable to fetch User:', error.message);
		}
	}

	// Create a new User
	async createUser(username) {
		try {
			const response = await fetch(this.USER_ENDPOINT, {
				method: 'POST',
				headers: this._getHeadersWithAuth(),
				body: JSON.stringify({ username })
			});
			
			if (!response.ok) throw new Error(`Error: ${response.statusText}`);
			return await response.json();
		} catch (error) {
			console.error('Unable to create User:', error.message);
		}
	}

	// Update a User by ID
	async updateUser(userID, formValue) {
		try {
			const response = await fetch(`${this.USER_ENDPOINT}/${userID}`, {
				method: 'PUT',
				headers: this._getHeadersWithAuth(),
				body: JSON.stringify(formValue),
			});
			
			const data = await response.json();
			if (response.ok) return data;
			else throw new Error(data.message);
		} catch (error) {
			console.error('Unable to update User:', error.message);
		}
	}

	// Delete a User by ID
	async deleteUser(userID) {
		try {
			const response = await fetch(`${this.USER_ENDPOINT}/${userID}`, {
				method: 'DELETE',
				headers: this._getHeadersWithAuth()
			});
			
			if (!response.ok) throw new Error(`Error: ${response.statusText}`);
			return await response.json();
		} catch (error) {
			console.error('Unable to delete User:', error.message);
		}
	}
}

export const userService = new UserService();
