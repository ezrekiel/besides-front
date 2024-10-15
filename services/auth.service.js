import { tokenService } from './token.service.js';
import { userService } from './user.service.js';

class AuthService {
	constructor() {
		this.AUTH_ENDPOINT = 'https://job.jiko-soft.com/auth';
		this.httpHeaders = {
			'Content-Type': 'application/json',
		};
	}

	async login(username, password) {
		try {
			const response = await fetch(`${this.AUTH_ENDPOINT}/signin`, {
				method: 'POST',
				headers: this.httpHeaders,
				body: JSON.stringify({ username, password }),
			});

			const data = await response.json();
			if (response.ok) {
				tokenService.setToken(data.token, data.expiryDate);
				userService.setUser(JSON.stringify(data.user));
				return data;
			} else throw new Error(data.message);
		} catch (error) {
			console.error('Login error:', error);
			throw error;
		}
	}
  
	async signup(formValue) {
		try {
			const response = await fetch(`${this.AUTH_ENDPOINT}/signup`, {
				method: 'POST',
				headers: this.httpHeaders,
				body: JSON.stringify(formValue),
			});
  
			const data = await response.json();
			if (response.ok) return data;
			else throw new Error(data.message);
		} catch (error) {
			console.error('Signup error:', error);
			throw error;
		}
	}

	isTokenValid(token) {
		const decodedToken = this.decodeJwt(token);
		if (!decodedToken) return false;
	
		const expDate = new Date(0);
		const nowUtc = new Date();
		expDate.setUTCSeconds(decodedToken.exp);

		return expDate > nowUtc;
	}
  
	decodeJwt(token) {
		try {
			const payload = token.split('.')[1];
			const decodedPayload = window.atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
			return JSON.parse(decodedPayload);
		} catch (error) {
			console.error('Error decoding token:', error);
			return null;
		}
	}

	isAuthenticated() {
		const token = tokenService.getToken();
		return token && this.isTokenValid(token);
	}
}
export const authService = new AuthService();
  