import { authService } from '../services/auth.service.js';
import { userService } from '../services/user.service.js';
import { offerService } from '../services/offer.service.js';

const usersManagementButton = document.getElementById('users-management');
const companiesManagementButton = document.getElementById('companies-management');
const offersManagementButton = document.getElementById('offers-management');
const createResourceForm = document.getElementById('createResourceForm');
const getAllResourcesBtn = document.getElementById('getAllResourcesBtn');
const getResourceForm = document.getElementById('getResourceForm');
const updateResourceForm = document.getElementById('updateResourceForm');
const deleteResourceForm = document.getElementById('deleteResourceForm');
const output = document.getElementById('output');

const propertiesNameMapping = {
	"userID" : "Id",
	"companyID" : "Id entreprise",
	"firstname" : "Prénom",
	"lastname" : "Nom",
	"username" : "E-mail",

	"id" : "Id",
	"companyName": "Entreprise",
    "legalStatus": "Statut legal",
    "activitySector": "Secteur d'activité",

	"offerID": "Id",
    "title": "Offre",
	"contractType": "Contrat"
}

function createTableRow(object) {
	const tableBody = document.getElementById('table-body');
	const tableBodyRow = document.createElement('tr');
	Object.keys(object).forEach(key => {
		const objectProperty = document.createElement('td');
		objectProperty.textContent = object[key];
		tableBodyRow.appendChild(objectProperty);
	});

	
	const tableBodyColumn5 = document.createElement('td');
	const tableBodyColumn6 = document.createElement('td');

    const svgElement = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svgElement.setAttribute("width", "24px");
    svgElement.setAttribute("height", "24px");
    svgElement.setAttribute("viewBox", "0 0 24 24");
    svgElement.setAttribute("fill", "none");
    svgElement.setAttribute("xmlns", "http://www.w3.org/2000/svg");

    const pathElement = document.createElementNS("http://www.w3.org/2000/svg", "path");
    pathElement.setAttribute("fill-rule", "evenodd");
    pathElement.setAttribute("clip-rule", "evenodd");
    pathElement.setAttribute("d", "M21.1213 2.70705C19.9497 1.53548 18.0503 1.53547 16.8787 2.70705L15.1989 4.38685L7.29289 12.2928C7.16473 12.421 7.07382 12.5816 7.02986 12.7574L6.02986 16.7574C5.94466 17.0982 6.04451 17.4587 6.29289 17.707C6.54127 17.9554 6.90176 18.0553 7.24254 17.9701L11.2425 16.9701C11.4184 16.9261 11.5789 16.8352 11.7071 16.707L19.5556 8.85857L21.2929 7.12126C22.4645 5.94969 22.4645 4.05019 21.2929 2.87862L21.1213 2.70705ZM18.2929 4.12126C18.6834 3.73074 19.3166 3.73074 19.7071 4.12126L19.8787 4.29283C20.2692 4.68336 20.2692 5.31653 19.8787 5.70705L18.8622 6.72357L17.3068 5.10738L18.2929 4.12126ZM15.8923 6.52185L17.4477 8.13804L10.4888 15.097L8.37437 15.6256L8.90296 13.5112L15.8923 6.52185ZM4 7.99994C4 7.44766 4.44772 6.99994 5 6.99994H10C10.5523 6.99994 11 6.55223 11 5.99994C11 5.44766 10.5523 4.99994 10 4.99994H5C3.34315 4.99994 2 6.34309 2 7.99994V18.9999C2 20.6568 3.34315 21.9999 5 21.9999H16C17.6569 21.9999 19 20.6568 19 18.9999V13.9999C19 13.4477 18.5523 12.9999 18 12.9999C17.4477 12.9999 17 13.4477 17 13.9999V18.9999C17 19.5522 16.5523 19.9999 16 19.9999H5C4.44772 19.9999 4 19.5522 4 18.9999V7.99994Z");
    pathElement.setAttribute("fill", "#000000");

    svgElement.appendChild(pathElement);

	const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
	svg.setAttribute("width", "24px");
	svg.setAttribute("height", "24px");
	svg.setAttribute("viewBox", "0 0 24 24");
	svg.setAttribute("fill", "none");
	svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");


	const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
	path.setAttribute("d", "M10 11V17M14 11V17M4 7H20M6 7H12 18V18C18 19.6569 16.6569 21 15 21H9C7.3431 21 6 19.6569 6 18V7ZM9 5C9 3.8954 9.8954 3 11 3H13C14.1046 3 15 3.8954 15 5V7H9V5Z");
	path.setAttribute("stroke", "#000000");
	path.setAttribute("stroke-width", "2");
	path.setAttribute("stroke-linecap", "round");
	path.setAttribute("stroke-linejoin", "round");

	svg.appendChild(path);

	tableBodyColumn5.appendChild(svgElement);
	tableBodyColumn6.appendChild(svg);
	tableBodyRow.appendChild(tableBodyColumn5);
	tableBodyRow.appendChild(tableBodyColumn6);

	tableBody.appendChild(tableBodyRow);
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

unloadTable.addEventListener('click', async () => {
	try {
		if(tableElement) {
			tableElement.remove(); // supprime le tableau si deja existant
		}
	} catch (error) {
		console.log(error);
	}
});

// Loads the list of all the users
usersManagementButton.addEventListener('click', async () => {
	try {
		unloadTable();

		const pageInformations = document.getElementById('page-name');
		const contentTitle = document.getElementById('content-name');
		pageInformations.textContent = 'Gestion utilisateurs';
		contentTitle.textContent = 'Utilisateurs';

		const users = await userService.getAllUsers();

		if (!users) return;

		const tableContainer = document.getElementById('content-table');

		//1ere étape : construire le tableau
		const tableElement = document.createElement('table');

		//2ème étape : construire le thead

		const tableHead = document.createElement('thead');
		const tableHeadRow = document.createElement('tr');

		Object.keys(users[0]).forEach(key => {
			const objectProperty = document.createElement('th');
			objectProperty.textContent = propertiesNameMapping[key];
			tableHeadRow.appendChild(objectProperty);
		});

		const tableHeadColumn5 = document.createElement('th');
		tableHeadColumn5.textContent = 'Edition';
		
		const tableHeadColumn6 = document.createElement('th');
		tableHeadColumn6.textContent = 'Supprimer';

		tableElement.appendChild(tableHead);
		tableHead.appendChild(tableHeadRow);
		tableHeadRow.appendChild(tableHeadColumn5);
		tableHeadRow.appendChild(tableHeadColumn6);

		//3ème étape : construire le tbody
		const tableBody = document.createElement('tbody');
		tableBody.setAttribute('id', 'table-body');
		tableElement.appendChild(tableBody);
		tableContainer.appendChild(tableElement);
		
		//4ème étape : insérer les tr
		users.forEach(user => {
			createTableRow(user);
		});

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

		//1ere étape : construire le tableau
		const tableElement = document.createElement('table');

		//2ème étape : construire le thead
		const tableHead = document.createElement('thead');
		const tableHeadRow = document.createElement('tr');

		Object.keys(users[0]).forEach(key => {
			const objectProperty = document.createElement('th');
			objectProperty.textContent = propertiesNameMapping[key];
			tableHeadRow.appendChild(objectProperty);
		});

		const tableHeadColumn5 = document.createElement('th');
		tableHeadColumn5.textContent = 'Edition';
		
		const tableHeadColumn6 = document.createElement('th');
		tableHeadColumn6.textContent = 'Supprimer';

		tableElement.appendChild(tableHead);
		tableHead.appendChild(tableHeadRow);
		tableHeadRow.appendChild(tableHeadColumn5);
		tableHeadRow.appendChild(tableHeadColumn6);

		//3ème étape : construire le tbody
		const tableBody = document.createElement('tbody');
		tableBody.setAttribute('id', 'table-body');
		tableElement.appendChild(tableBody);
		tableContainer.appendChild(tableElement);
		
		//4ème étape : insérer les tr
		companies.forEach(company => {
			createTableRow(company);
		});
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

		//1ere étape : construire le tableau
		const tableElement = document.createElement('table');

		//2ème étape : construire le thead
		const tableHead = document.createElement('thead');
		const tableHeadRow = document.createElement('tr');

		const tableData = offers[0].getTableData();
		console.log(tableData);
		Object.keys(tableData).forEach(key => {
			const objectProperty = document.createElement('th');
			objectProperty.textContent = key;
			tableHeadRow.appendChild(objectProperty);
		});

		const tableHeadColumn5 = document.createElement('th');
		tableHeadColumn5.textContent = 'Edition';
		
		const tableHeadColumn6 = document.createElement('th');
		tableHeadColumn6.textContent = 'Supprimer';

		tableElement.appendChild(tableHead);
		tableHead.appendChild(tableHeadRow);
		tableHeadRow.appendChild(tableHeadColumn5);
		tableHeadRow.appendChild(tableHeadColumn6);

		//3ème étape : construire le tbody
		const tableBody = document.createElement('tbody');
		tableBody.setAttribute('id', 'table-body');
		tableElement.appendChild(tableBody);
		tableContainer.appendChild(tableElement);
		
		//4ème étape : insérer les tr
		offers.forEach(offer => {
			createTableRow(offer.getTableData());
		});
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