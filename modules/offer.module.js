import { offerService } from '../services/offer.service.js';
import { userService } from '../services/user.service.js';
import { authService } from '../services/auth.service.js';

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
    offerPublicationTime.textContent = "Offre publiée " + translateToRelativeTime(offer.postedAt);

    offerElement.appendChild(offerTitle);
    offerElement.appendChild(offerCompany);
    offerElement.appendChild(offerLocation);
    offerElement.appendChild(tagsContainer);
    offerElement.appendChild(offerPublicationTime);

    offersContainer.appendChild(offerElement);
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
		const offers = await offerService.getAllOffers();
		console.log(offers);
		if (!offers) return;
		offers.forEach(offer => {
			createOfferFrame(offer);
		});
	} catch (error) {
		console.log(`Fetching Offers Failed: ${error.message}`);
	}
});