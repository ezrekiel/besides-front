import { authService } from '../services/auth.service.js';
import { tokenService } from '../services/token.service.js';

const loginForm = document.getElementById('signin-form');

window.addEventListener('DOMContentLoaded', () => {
	const token = tokenService.getToken();
	if (token && authService.isTokenValid(token)) {
		const currentPath = window.location.pathname;
		const newPath = currentPath.replace('/signin/signin.html', '/offers/offers.html');
		window.location.href = newPath;
	}
});

loginForm.addEventListener('submit', async (e) => {
	e.preventDefault();
	const username = document.getElementById('username').value;
	const password = document.getElementById('password').value;

	try {
		const loginResponse = await authService.login(username, password);
		console.log(loginResponse);
		
		tokenService.setToken(loginResponse.token, loginResponse.expiryDate);
		const currentPath = window.location.pathname;
		const newPath = currentPath.replace('/signin/signin.html', '/offers/offers.html');
		
		window.location.href = newPath;
	} catch (error) {
		output.textContent = `Login Failed: ${error.message}`;
	}
});