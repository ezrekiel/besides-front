import { authService } from '../services/auth.service.js';
import { userService } from '../services/user.service.js';
import { companyService } from '../services/company.service.js';
import { offerService } from '../services/offer.service.js';
import { domHelper } from '../helpers/dom.helper.js';
import { EDIT_SVG, DELETE_SVG, PROPERTIES_NAMES_MAPPING } from '../helpers/constants.helper.js';

const companiesManagementButton = document.getElementById('companies-management');
const offersManagementButton = document.getElementById('offers-management');
const usersManagementButton = document.getElementById('users-management');
const newRessourceButton = document.getElementById('createButton');
const usernameButton = document.getElementById('header-username');
const offersButton = document.getElementById('header-offers');

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

function createModalFrame(resource) {
	const modalFrame = domHelper.createHTMLElement('div', {id: 'userModal', class: 'modal'}, document.body);
	const modalContent = domHelper.createHTMLElement('div', {class: 'modal-content'}, modalFrame);
	const closeModal = domHelper.createHTMLElement('span', {class: 'close'}, modalContent);

	closeModal.innerHTML = '&times;';
	const modalFormTitle = domHelper.createHTMLElement('h2', {}, modalContent);
	modalFormTitle.textContent = 'Créer un nouvel utilisateur';
	const modalForm = domHelper.createHTMLElement('form', {id: 'userForm'}, modalContent); //important

	const contentTitle = document.getElementById('content-name');
	if (contentTitle.textContent == 'Utilisateurs') {
		const fields = [
			{label: 'Nom', type: 'text', id: 'lastName', name: 'nom'},
			{label: 'Prénom', type: 'text', id: 'firstName', name: 'prenom'},
			{label: 'Adresse E-mail', type: 'text', id: 'mail', name: 'prenom'},
			{label: 'Mot de passe', type: 'password', id: 'password', name: 'password'},
			{label: 'Administrateur', type: 'select', id: 'isAdmin', name: 'isAdmin', options: ['non', 'oui']},
			{label: 'Date de naissance', type: 'date', id: 'birthday', name: 'birthday'},
			{label: 'Téléphone', type: 'tel', id: 'phoneNumber', name: 'phoneNumber'},
			{label: 'Genre', type: 'select', id: 'gender', name: 'gender', options: ['homme', 'femme']},
			{label: 'Employeur', type: 'select', id: 'employer', name: 'employer', options: ['non', 'oui']},
			{label: 'Adresse', type: 'text', id: 'adress', name: 'adress'},
			{label: 'Code postal', type: 'text', id: 'zipCode', name: 'zipCode'},
			{label: 'Pays', type: 'text', id: 'coutry', name: 'coutry'},
			{label: 'Ville', type: 'text', id: 'city', name: 'city'}
		];
	}

	if (contentTitle.textContent == 'Entreprises') {
		const fields = [
			{label: 'Nom', type: 'text', id: 'companyName', name: 'companyName'},
			{label: 'Statut légal', type: 'text', id: 'legalStatus', name: 'legalStatus'},
			{label: 'Secteur d', type: 'text', id: 'activitySector', name: 'activitySector'}
		];
	}

	if (contentTitle.textContent == 'Annonces') {
		const fields = [
			{label: 'Nom', type: 'text', id: 'lastName', name: 'nom'},
			{label: 'Prénom', type: 'text', id: 'firstName', name: 'prenom'},
			{label: 'Adresse E-mail', type: 'text', id: 'mail', name: 'prenom'},
			{label: 'Mot de passe', type: 'password', id: 'password', name: 'password'},
			{label: 'Administrateur', type: 'select', id: 'isAdmin', name: 'isAdmin', options: ['non', 'oui']},
			{label: 'Date de naissance', type: 'date', id: 'birthday', name: 'birthday'},
			{label: 'Téléphone', type: 'tel', id: 'phoneNumber', name: 'phoneNumber'},
			{label: 'Genre', type: 'select', id: 'gender', name: 'gender', options: ['homme', 'femme']},
			{label: 'Employeur', type: 'select', id: 'employer', name: 'employer', options: ['non', 'oui']},
			{label: 'Adresse', type: 'text', id: 'adress', name: 'adress'},
			{label: 'Code postal', type: 'text', id: 'zipCode', name: 'zipCode'},
			{label: 'Pays', type: 'text', id: 'coutry', name: 'coutry'},
			{label: 'Ville', type: 'text', id: 'city', name: 'city'}
		];
	}

	  fields.forEach(field => {
		const label = domHelper.createHTMLElement('label', {for: field.id}, modalForm);
		label.textContent = field.label;
	
		if (field.type === 'select') {
		  const select = domHelper.createHTMLElement('select', {id: field.id, name: field.name}, modalForm);
		  field.options.forEach(option => {
			const opt = domHelper.createHTMLElement('option', {value: option}, select);
			opt.textContent = option;
		  });
		} else {
		  domHelper.createHTMLElement('input', {type: field.type, id: field.id, name: field.name, required: 'true'}, modalForm);
		}
	  });

		const formActions = domHelper.createHTMLElement('div', {class: 'form-actions'}, modalForm);
		const submitButton = domHelper.createHTMLElement('button', {type: 'submit'}, formActions);
		submitButton.textContent = 'Créer';

		const cancelButton = domHelper.createHTMLElement('button', {type: 'button'}, formActions);
		cancelButton.textContent = 'Annuler';

		const modal = document.getElementById('userModal');
		const btn = document.getElementById('createButton');

		btn.onclick = function() {
			modal.style.display = 'block';
		};

		closeModal.onclick = function() {
			modal.style.display = 'none';
		};

		cancelButton.onclick = function() {
			modal.style.display = 'none';
		};

		window.onclick = function(event) {
			if (event.target == modal) {
			modal.style.display = 'none';
			}
		};

		modalForm.onsubmit = function(event) {
			event.preventDefault();
			const formData = new FormData(modalForm);
			const data = {};
			formData.forEach((value, key) => {
			data[key] = value;
			});
			console.log('Données du formulaire:', data);
			modal.style.display = 'none';
		};
}

newRessourceButton.addEventListener('click', async () => {
    const contentTitle = document.getElementById('content-name');

    switch(contentTitle.textContent) {
        case 'Utilisateurs':
            console.log('creation utilisateur');
			createModalFrame('Utilisateurs');
			break;
        case 'Entreprises':
            console.log('creation entreprise');
			createModalFrame('Entreprises');
			break;
		case 'Annonces':
            console.log('creation annonce');
			createModalFrame('Annonces');
			break;
		default:
			console.log('ca pas normal' + contentTitle);
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