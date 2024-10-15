import { authService } from '../services/auth.service.js';

const loginForm = document.getElementById('signin-form');

window.addEventListener('DOMContentLoaded', () => {
	if (authService.isAuthenticated()) {
		window.location.href = '/besides-front/views/offers/offers.html';
		return;
	}
});

loginForm.addEventListener('submit', async (e) => {
	e.preventDefault();
	const username = document.getElementById('username').value;
	const password = document.getElementById('password').value;

	try {
		const loginResponse = await authService.login(username, password);
		console.log(loginResponse);
		
		window.location.href = '/besides-front/views/offers/offers.html';
	} catch (error) {
		output.textContent = `Login Failed: ${error.message}`;
	}
});