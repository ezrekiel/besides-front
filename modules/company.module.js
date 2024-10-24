import { companyService } from '../services/company.service.js';
import { userService } from '../services/user.service.js';
import { authService } from '../services/auth.service.js';

const createCompanyForm = document.getElementById('createCompanyForm');
const getAllCompaniesBtn = document.getElementById('getAllCompaniesBtn');
const getCompanyForm = document.getElementById('getCompanyForm');
const updateCompanyForm = document.getElementById('updateCompanyForm');
const deleteCompanyForm = document.getElementById('deleteCompanyForm');
const output = document.getElementById('output');

function translateToRelativeTime(postedAt) {
    const now = new Date();
    const postedDate = new Date(postedAt);
    
    const diffInMs = now - postedDate;
    
    const seconds = Math.floor(diffInMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (seconds < 60) return seconds <= 1 ? "à l'instant" : `il y a ${seconds} secondes`;
    else if (minutes < 60) return minutes === 1 ? "il y a 1 minute" : `il y a ${minutes} minutes`;
    else if (hours < 24) {
        if (hours === 1) return "il y a 1 heure";
        if (hours === 24 && now.getDate() === postedDate.getDate() + 1) return "hier";
        return `il y a ${hours} heures`;
    }
	else if (days < 30) {
        if (days === 1) return "hier";
        return `il y a ${days} jours`;
    }
	else if (months < 12)  return months === 1 ? "il y a 1 mois" : `il y a ${months} mois`;
    else return years === 1 ? "il y a 1 an" : `il y a ${years} ans`;
}

function createCompanyFrame(company) {
    const companiesContainer = document.querySelector('.companies-container');

    const companyElement = document.createElement('div');
    companyElement.classList.add('company');

    const companyTitle = document.createElement('div');
    companyTitle.classList.add('company-title');
    companyTitle.innerHTML = `<b>${company.title}</b>`;

    const companyCompany = document.createElement('div');
    companyCompany.classList.add('company-company');
    companyCompany.textContent = company.companyName;

    const companyLocation = document.createElement('div');
    companyLocation.classList.add('company-location');
    companyLocation.textContent = `${company.city} ${company.zipCode}`;

    const tagsContainer = document.createElement('div');
	const companyTags = [company.contractType, company.salary, company.jobType];
    tagsContainer.classList.add('tags');
	companyTags.forEach(companyTag => {
        const tag = document.createElement('div');
        tag.classList.add('tag');
        tag.textContent = companyTag;
        tagsContainer.appendChild(tag);
	});

    const companyPublicationTime = document.createElement('div');
    companyPublicationTime.classList.add('company-publication-time');
    companyPublicationTime.textContent = "Offre publiée " + translateToRelativeTime(company.postedAt);

    companyElement.appendChild(companyTitle);
    companyElement.appendChild(companyCompany);
    companyElement.appendChild(companyLocation);
    companyElement.appendChild(tagsContainer);
    companyElement.appendChild(companyPublicationTime);

    companysContainer.appendChild(companyElement);
}

window.addEventListener('DOMContentLoaded', async () => {
	if (!authService.isAuthenticated()) {
		window.location.href = '/besides-front/views/signin/signin.html';
		return;
	}

	// Returns username in the header
	const currentUser = JSON.parse(userService.getUser());
	if (currentUser) {
		const username = document.getElementById('username');
		username.textContent = `${currentUser.firstname} ${currentUser.lastname}`;
	}

	try {
		const companies = await companyService.getAll();
		console.log(companies);
		if (!companies) return;
		companies.forEach(offer => {
			createOfferFrame(offer);
		});
	} catch (error) {
		console.log(`Fetching companies Failed: ${error.message}`);
	}
});


// Handle creating a company
createCompanyForm.addEventListener('submit', async (e) => {
	e.preventDefault();
	const companyName = document.getElementById('create-company-name').value;

	try {
		const createResponse = await companyService.createCompany(companyName);
		output.textContent = `Company Created: ${JSON.stringify(createResponse)}`;
	} catch (error) {
		output.textContent = `Company Creation Failed: ${error.message}`;
	}
});

// Handle fetching all companies
getAllCompaniesBtn.addEventListener('click', async () => {
	try {
		const allCompanies = await companiesService.getAllCompaniess();
		output.textContent = `All Companies: ${JSON.stringify(allCompaniess, null, 2)}`;
	} catch (error) {
		output.textContent = `Fetching Companies Failed: ${error.message}`;
	}
});

// Handle fetching a specific company by ID
getCompanyForm.addEventListener('submit', async (e) => {
	e.preventDefault();
	const companyId = document.getElementById('get-company-id').value;

	try {
		const company = await companyService.getcompanyById(companyId);
		output.textContent = `Company: ${JSON.stringify(company, null, 2)}`;
	} catch (error) {
		output.textContent = `Fetching Company Failed: ${error.message}`;
	}
});

// Handle updating a company by ID
updateCompanyForm.addEventListener('submit', async (e) => {
	e.preventDefault();
	const companyId = document.getElementById('update-company-id').value;
	const companyName = document.getElementById('update-company-name').value;

	try {
		const updateResponse = await companyService.updateOfferCompany(companyId, companyName);
		output.textContent = `Company Updated: ${JSON.stringify(updateResponse)}`;
	} catch (error) {
		output.textContent = `Company Update Failed: ${error.message}`;
	}
});

// Handle deleting a company by ID
deleteCompanyForm.addEventListener('submit', async (e) => {
	e.preventDefault();
	const companyId = document.getElementById('delete-company-id').value;

	try {
		const deleteResponse = await companyService.deleteCompany(companyId);
		output.textContent = `Company Deleted: ${JSON.stringify(deleteResponse)}`;
	} catch (error) {
		output.textContent = `Company Deletion Failed: ${error.message}`;
	}
});