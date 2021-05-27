/* chcemy wyrenderować nasze komórki użytkownikowi wewnątrz <article> */
// chcemy złapać nasz <article>
export class UI {
	// obiekt w którym chcemy trzymać wszystkie nasze selektory
	UiSelectors = {
		// wyszukujemy po atrybucie data(zapisujemy w stringu)
		board: '[data-board]',
		cell: '[data-cell]',
		counter: '[data-counter]',
		timer: '[data-timer]',
	};
	getElement(selector) {
		return document.querySelector(selector);
	}
	getElements(selector) {
		return document.querySelectorAll(selector);
	}
}
