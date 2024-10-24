import { offerService } from '../services/offer.service.js';
import { userService } from '../services/user.service.js';
import { authService } from '../services/auth.service.js';
import { domHelper } from '../helpers/dom.helper.js';

const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-bar');

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

function createOfferFrames(parentElement, offers) {
	parentElement.replaceChildren();
	offers.forEach(offer => {
		const offerElement = domHelper.createHTMLElement('div', {class: 'offer'}, parentElement);
		domHelper.createHTMLElement('div', {class: 'offer-title'}, offerElement, offer.title);
		domHelper.createHTMLElement('div', {class: 'offer-company'}, offerElement, offer.companyName);
		domHelper.createHTMLElement('div', {class: 'offer-location'}, offerElement, `${offer.city} ${offer.zipCode}`);

		const tagsContainer = domHelper.createHTMLElement('div', {class: 'tags'}, offerElement);
		const offerTags = [offer.contractType, offer.salary, offer.jobType];
		offerTags.forEach(offerTag => domHelper.createHTMLElement('div', {class: 'tag'}, tagsContainer, offerTag));
        
		domHelper.createHTMLElement('div', {class: 'offer-publication-time'}, offerElement, "Offre publiée " + translateToRelativeTime(offer.postedAt));
	});
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
		if (!offers) return;

		const offerContainer = document.getElementById('offers-container');
		createOfferFrames(offerContainer, offers);
	} catch (error) {
		console.error(`Fetching Offers Failed: ${error.message}`);
	}
});

async function handleSearchResults(searchValue) {
    const offerContainer = document.getElementById('offers-container');
	const offers = await offerService.getOffersBySearch(searchValue);
    createOfferFrames(offerContainer, offers);
}

searchButton.addEventListener('click', async function() {
	handleSearchResults(searchInput.value);
});

searchInput.addEventListener('keypress', async function(event) {
	if (event.key !== 'Enter') return;

	handleSearchResults(searchInput.value);
});