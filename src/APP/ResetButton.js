import { UI } from './UI.js';

export class ResetButton extends UI {
	element = this.getElement(this.UiSelectors.resetButton);

	// zmieniamy obrazek z minaką
	changeEmotion(emotion) {
		// mamy wybrany nasz button
		// wewnątrz naszego buttona chcemy wybrać element use
		// i będziemly chcieli zmieniać atrybut href(naszą minkę)
		// metoda setAttribute ustawia nową wartość dla atrybutu
		this.element.querySelector('use').setAttribute('href', `./assets/sprite.svg#${emotion}`);
	}
}
