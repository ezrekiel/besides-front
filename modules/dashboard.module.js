import { authService } from '../services/auth.service.js';
import { userService } from '../services/user.service.js';
import { companyService } from '../services/company.service.js';
import { offerService } from '../services/offer.service.js';
import { domHelper } from '../helpers/dom.helper.js';
import { EDIT_SVG, DELETE_SVG, PROPERTIES_NAMES_MAPPING } from '../helpers/constants.helper.js';

const usersManagementButton = document.getElementById('users-management');
const companiesManagementButton = document.getElementById('companies-management');
const offersManagementButton = document.getElementById('offers-management');
const createResourceForm = document.getElementById('createResourceForm');
const getAllResourcesBtn = document.getElementById('getAllResourcesBtn');
const getResourceForm = document.getElementById('getResourceForm');
const updateResourceForm = document.getElementById('updateResourceForm');
const deleteResourceForm = document.getElementById('deleteResourceForm');
const output = document.getElementById('output');
const usernameButton = document.getElementById('header-username');
const offersButton = document.getElementById('header-offers');
const dashboardButton = document.getElementById('header-dashboard');

function createResourceTable(parentElement, resources) {
	parentElement.replaceChildren();
	const table = domHelper.createHTMLElement('table', {}, parentElement);

	//Table Head
	const tableHead = domHelper.createHTMLElement('thead', {}, table);
	const tableHeadRow = domHelper.createHTMLElement('tr', {}, tableHead);
	Object.keys(resources[0].getTableData()).forEach(key => domHelper.createHTMLElement('th', {}, tableHeadRow, PROPERTIES_NAMES_MAPPING[key]));
	domHelper.createHTMLElement('th', {}, tableHeadRow, 'Editer');
	domHelper.createHTMLElement('th', {}, tableHeadRow, 'Supprimer');

	//Table Body
	const tableBody = domHelper.createHTMLElement('tbody', {}, table);
	resources.forEach(resource => {
		const filterdResource = resource.getTableData();
		const tableBodyRow = domHelper.createHTMLElement('tr', {}, tableBody);
		Object.keys(filterdResource).forEach(key => domHelper.createHTMLElement('td', {}, tableBodyRow, filterdResource[key]));
		domHelper.createHTMLElement('td', {}, tableBodyRow, EDIT_SVG);
		domHelper.createHTMLElement('td', {}, tableBodyRow, DELETE_SVG);
	});
}

window.addEventListener('DOMContentLoaded', async () => {
	if (!authService.isAuthenticated()) {
		window.location.href = '/besides-front/views/signin/signin.html';
		return;
	}

	const currentUser = JSON.parse(userService.getUser());
	if (currentUser) {
		const username = document.getElementById('header-username');
		username.textContent = `${currentUser.firstname} ${currentUser.lastname}`;
	}
});

// Loads the list of all the users
usersManagementButton.addEventListener('click', async () => {
	try {
		const pageInformations = document.getElementById('page-name');
		const contentTitle = document.getElementById('content-name');
		pageInformations.textContent = 'Gestion utilisateurs';
		contentTitle.textContent = 'Utilisateurs';

		const users = await userService.getAllUsers();

		if (!users) return;
		const tableContainer = document.getElementById('content-table');
		createResourceTable(tableContainer, users);
	} catch(error) {
		console.log(error);
	}
});

// Loads the list of all the companies
companiesManagementButton.addEventListener('click', async () => {
	try {

		const pageInformations = document.getElementById('page-name');
		const contentTitle = document.getElementById('content-name');
		pageInformations.textContent = 'Gestion entreprises';
		contentTitle.textContent = 'Entreprises';

		const companies = await companyService.getAllCompanies();
		if (!companies) return;

		const tableContainer = document.getElementById('content-table');
		createResourceTable(tableContainer, companies);
	} catch(error) {
		console.log(error);
	}
});

// Loads the list of all the offers
offersManagementButton.addEventListener('click', async () => {
	try {
		const pageInformations = document.getElementById('page-name');
		const contentTitle = document.getElementById('content-name');
		pageInformations.textContent = 'Gestion offres';
		contentTitle.textContent = 'Offres';

		const offers = await offerService.getAllOffers();
		if (!offers) return;

		const tableContainer = document.getElementById('content-table');
		createResourceTable(tableContainer, offers);
	} catch(error) {
		console.log(error);
	}
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