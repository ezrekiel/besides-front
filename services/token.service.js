class TokenService {
	constructor() {
		this.TOKEN_KEY = 'auth-token';
		this.TOKEN_EXPIRY_KEY = 'auth-token-expiry-date';
	}
	
	setToken(token, expiryDate) {
		window.sessionStorage.removeItem(this.TOKEN_KEY);
		window.sessionStorage.setItem(this.TOKEN_KEY, token);
	
		window.sessionStorage.removeItem(this.TOKEN_EXPIRY_KEY);
		window.sessionStorage.setItem(this.TOKEN_EXPIRY_KEY, expiryDate);
	}
	
	getToken() {
		return window.sessionStorage.getItem(this.TOKEN_KEY) ?? '';
	}
	
	getExpiryDate() {
		return window.sessionStorage.getItem(this.TOKEN_EXPIRY_KEY) ?? '';
	}
	
	destroySession() {
		window.sessionStorage.removeItem(this.TOKEN_KEY);
		window.sessionStorage.removeItem(this.TOKEN_EXPIRY_KEY);
	}
}
export const tokenService = new TokenService();
