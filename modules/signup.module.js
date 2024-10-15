import { authService } from '../services/auth.service.js';

const signupForm = document.getElementById('signup-form');

window.addEventListener('DOMContentLoaded', () => {
	if (authService.isAuthenticated()) {
		window.location.href = '/besides-front/views/offers/offers.html';
		return;
	}
});

signupForm.addEventListener('submit', async (e) => {
	e.preventDefault();
	const firstName = document.getElementById('firstname').value;
	const lastName = document.getElementById('lastname').value;
	const phoneNumber = document.getElementById('phone-number').value;
	const username = document.getElementById('username').value;
	const password = document.getElementById('password').value;

	try {
		const signupForm = {firstName, lastName, phoneNumber, username, password}
		const signupResponse = await authService.signup(signupForm);
		console.log(signupResponse);

		window.location.href = '/besides-front/views/signin/signin.html';
	} catch (error) {
		console.log(error.message);
	}
});