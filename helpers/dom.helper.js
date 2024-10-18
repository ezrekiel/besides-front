class DOMHelper {
	createHTMLElement(tagName, attributes = {}, parent = document.body, content = '', prepend = false) {
		const element = document.createElement(tagName);
		for (const key in attributes) {
			if (attributes.hasOwnProperty(key)) element.setAttribute(key, attributes[key]);
		}

		if (typeof content === 'string') element.textContent = content;
		else if (content instanceof HTMLElement) element.appendChild(content);

		if (prepend) parent.prepend(element);
		else parent.appendChild(element);

		return element;
	}
}
export const domHelper = new DOMHelper();