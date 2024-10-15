import { authService } from '../services/auth.service.js';
import { tokenService } from '../services/token.service.js';

const signupForm = document.getElementById('signup-form');

window.addEventListener('DOMContentLoaded', () => {
	const token = tokenService.getToken();
	if (token && authService.isTokenValid(token)) {
		const currentPath = window.location.pathname;
		const newPath = currentPath.replace('/signup/signup.html', '/offers/offers.html');
		window.location.href = newPath;
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

		const currentPath = window.location.pathname;
		const newPath = currentPath.replace('/signup/signup.html', '/signin/signin.html');
		
		window.location.href = newPath;
	} catch (error) {
		console.log(error.message);
	}
});