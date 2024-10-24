import { tokenService } from '../services/token.service.js';
import { userService } from '../services/user.service.js';
import { authService } from '../services/auth.service.js';

const editProfileForm = document.getElementById('edit-profile-form');
const usernameButton = document.getElementById('header-username');
const signoutButton = document.getElementById('signout');
const offersButton = document.getElementById('header-offers');
const dashboardButton = document.getElementById('header-dashboard');

function populateFieldsValue(user) {
	document.getElementById('username').value = user.username || '';
	document.getElementById('firstname').value = user.firstname || '';
	document.getElementById('lastname').value = user.lastname || '';
	document.getElementById('phoneNumber').value = user.phoneNumber || '' || '';
	document.getElementById('address').value = user.address || '';
	document.getElementById('zipCode').value = user.zipCode || '';
	document.getElementById('city').value = user.city || '';
	document.getElementById('country').value = user.country || '';
}

window.addEventListener('DOMContentLoaded', async () => {
	if (!authService.isAuthenticated()) {
		window.location.href = '/besides-front/views/signin/signin.html';
		return;
	}

	const currentUser = JSON.parse(userService.getUser());
	if (currentUser) {
		const username = document.getElementById('header-username');
		const title = document.getElementById('edit-profile-title');
		
		username.textContent = title.textContent =`${currentUser.firstname} ${currentUser.lastname}`;
	}

	const user = await userService.getUserById(currentUser.userID);
	if (!user) return;

	populateFieldsValue(user);
});

editProfileForm.addEventListener('submit', async function(event) {
	event.preventDefault();

	const currentUser = JSON.parse(userService.getUser());
	if (currentUser) {
		const fields = ['username', 'firstname', 'lastname', 'phoneNumber', 'address', 'zipCode', 'city', 'country'];
		const editForm = fields.reduce((form, field) => {
			const value = document.getElementById(field).value || '';
			if (value) form[field === 'firstname' ? 'firstName' : field === 'lastname' ? 'lastName' : field] = value;
			return form;
		}, {});
		const editResponse = await userService.updateUser(currentUser.userID, editForm);
		console.log(editResponse);
	}
});

signoutButton.addEventListener('click', function() {
    tokenService.destroySession();
    userService.destroySession();
    
	window.location.href = '/besides-front/views/signin/signin.html';
});

usernameButton.addEventListener('click', function() {
	window.location.href = '/besides-front/views/profile/profile.html';
});
offersButton.addEventListener('click', function() {
	window.location.href = '/besides-front/views/offers/offers.html';
});
dashboardButton.addEventListener('click', function() {
	window.location.href = '/besides-front/views/dashboard/dashboard.html';
});