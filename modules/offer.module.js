import { resourceService } from '../services/offer.service.js';

const createResourceForm = document.getElementById('createResourceForm');
const getAllResourcesBtn = document.getElementById('getAllResourcesBtn');
const getResourceForm = document.getElementById('getResourceForm');
const updateResourceForm = document.getElementById('updateResourceForm');
const deleteResourceForm = document.getElementById('deleteResourceForm');
const output = document.getElementById('output');

function translateRelativeTime(postedAt) {
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


function createOfferFrame(offer) {
    const offersContainer = document.querySelector('.offers-container');

    const offerElement = document.createElement('div');
    offerElement.classList.add('offer');

    const offerTitle = document.createElement('div');
    offerTitle.classList.add('offer-title');
    offerTitle.innerHTML = `<b>${offer.title}</b>`;

    const offerCompany = document.createElement('div');
    offerCompany.classList.add('offer-company');
    offerCompany.textContent = offer.companyName;

    const offerLocation = document.createElement('div');
    offerLocation.classList.add('offer-location');
    offerLocation.textContent = `${offer.city} ${offer.zipCode}`;

    const tagsContainer = document.createElement('div');
	const offerTags = [offer.contractType, offer.salary, offer.jobType];
    tagsContainer.classList.add('tags');
	offerTags.forEach(offerTag => {
        const tag = document.createElement('div');
        tag.classList.add('tag');
        tag.textContent = offerTag;
        tagsContainer.appendChild(tag);
	});

    const offerPublicationTime = document.createElement('div');
    offerPublicationTime.classList.add('offer-publication-time');
    offerPublicationTime.textContent = "Offre publiée " + translateRelativeTime(offer.postedAt);

    offerElement.appendChild(offerTitle);
    offerElement.appendChild(offerCompany);
    offerElement.appendChild(offerLocation);
    offerElement.appendChild(tagsContainer);
    offerElement.appendChild(offerPublicationTime);

    offersContainer.appendChild(offerElement);
}

window.addEventListener('DOMContentLoaded', async () => {
	try {
		const offers = await resourceService.getAllResources();
		console.log(offers);
		if (!offers) return;
		offers.forEach(offer => {
			createOfferFrame(offer);
		});
	} catch (error) {
		console.log(`Fetching Resources Failed: ${error.message}`);
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