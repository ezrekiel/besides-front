import { authService } from '../services/auth.service.js';
import { userService } from '../services/user.service.js';
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

function createResourceTable(parentElement, resources) {
	const table = domHelper.createHTMLElement('table', {}, parentElement);

	//Table Head
	const tableHead = domHelper.createHTMLElement('thead', {}, table);
	const tableHeadRow = domHelper.createHTMLElement('tr', {}, tableHead);
	Object.keys(resources[0]).forEach(key => domHelper.createHTMLElement('th', {}, tableHeadRow, PROPERTIES_NAMES_MAPPING[key]));
	domHelper.createHTMLElement('th', {}, tableHeadRow, 'Editer');
	domHelper.createHTMLElement('th', {}, tableHeadRow, 'Supprimer');

	//Table Body
	const tableBody = domHelper.createHTMLElement('tbody', {}, table);
	resources.forEach(resource => {
		const tableBodyRow = domHelper.createHTMLElement('tr', {}, tableBody);
		Object.keys(resource).forEach(key => domHelper.createHTMLElement('td', {}, tableBodyRow, resource[key]));
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
		const username = document.getElementById('username');
		username.textContent = `${currentUser.firstname} ${currentUser.lastname}`;
	}
});

// Loads the list of all the users
usersManagementButton.addEventListener('click', async () => {
	try {
		//unloadTable(); //TODO : Proper implementation of this shit

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
		createResourceTable(tableContainer, companies);
	} catch(error) {
		console.log(error);
	}
});

// Handle creating a resource
createResourceForm.addEventListener('submit', async (e) => {
	e.preventDefault();
	const resourceName = document.getElementById('create-resource-name').value;

	try {
		const createResponse = await resourceService.createResource(resourceName);
		output.textContent = `Resource Created: ${JSON.stringify(createResponse)}`;
	} catch (error) {
		output.textContent = `Resource Creation Failed: ${error.message}`;
	}
});

// Handle fetching all resources
getAllResourcesBtn.addEventListener('click', async () => {
	try {
		const allResources = await resourceService.getAllResources();
		output.textContent = `All Resources: ${JSON.stringify(allResources, null, 2)}`;
	} catch (error) {
		output.textContent = `Fetching Resources Failed: ${error.message}`;
	}
});

// Handle fetching a specific resource by ID
getResourceForm.addEventListener('submit', async (e) => {
	e.preventDefault();
	const resourceId = document.getElementById('get-resource-id').value;

	try {
		const resource = await resourceService.getResourceById(resourceId);
		output.textContent = `Resource: ${JSON.stringify(resource, null, 2)}`;
	} catch (error) {
		output.textContent = `Fetching Resource Failed: ${error.message}`;
	}
});

// Handle updating a resource by ID
updateResourceForm.addEventListener('submit', async (e) => {
	e.preventDefault();
	const resourceId = document.getElementById('update-resource-id').value;
	const resourceName = document.getElementById('update-resource-name').value;

	try {
		const updateResponse = await resourceService.updateResource(resourceId, resourceName);
		output.textContent = `Resource Updated: ${JSON.stringify(updateResponse)}`;
	} catch (error) {
		output.textContent = `Resource Update Failed: ${error.message}`;
	}
});

// Handle deleting a resource by ID
deleteResourceForm.addEventListener('submit', async (e) => {
	e.preventDefault();
	const resourceId = document.getElementById('delete-resource-id').value;

	try {
		const deleteResponse = await resourceService.deleteResource(resourceId);
		output.textContent = `Resource Deleted: ${JSON.stringify(deleteResponse)}`;
	} catch (error) {
		output.textContent = `Resource Deletion Failed: ${error.message}`;
	}
});