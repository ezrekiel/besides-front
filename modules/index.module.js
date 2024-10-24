import { authService } from '../services/auth.service.js';

window.addEventListener('DOMContentLoaded', () => {
	if (authService.isAuthenticated()) {
		window.location.href = '/besides-front/views/offers/offers.html';
		return;
	} else {
		window.location.href = '/besides-front/views/signin/signin.html';
		return;
	}
});