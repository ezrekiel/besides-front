import { authService } from '../services/auth.service.js';
import { userService } from '../services/user.service.js';

const createResourceForm = document.getElementById('createResourceForm');
const getAllResourcesBtn = document.getElementById('getAllResourcesBtn');
const getResourceForm = document.getElementById('getResourceForm');
const updateResourceForm = document.getElementById('updateResourceForm');
const deleteResourceForm = document.getElementById('deleteResourceForm');
const output = document.getElementById('output');

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