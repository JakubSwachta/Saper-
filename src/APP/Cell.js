import { UI } from './UI.js';

/* Każdy index naszej tablicy Cells składa się z tablic a każda tablica z 8 obiektów.  */
// obiekt będący instacją tej klasy push do naszej tablicy cells
export class Cell extends UI {
	constructor(x, y) {
		super();
		this.x = x;
		this.y = y;
		this.value = 0;
		this.isMine = false;
		this.isReveal = false;
		this.isFlagged = false;
		// dataset (własne atrybuty zaczynają  się od słowa data
		/*- [data-x="${this.x}"] to atrybut którego [w nowym obiekcie neww Cell będącym instacją tej klasy]  wartością jest numer [columna] który został przisany  w pętli for -*/
		this.selector = `[data-x="${this.x}"][data-y="${this.y}"]`;
		this.element = null;
	}

	/* -- Metoda która do zmiennej przypisje nam diva z kalsami i atrybutami po których chwytamy i zwraca go  --*/
	createElement() {
		const element = `<div class="cell border border--concave" data-cell data-x="${this.x}" data-y="${this.y}"></div>`;
		return element;
	}

	// zmieniamy isReveal na true
	// usuwamy z listy calss klasę border--concave.
	// a dodajemy nową klasę z css odpowiedzilaną za wklęsłość
	revealCell() {
		this.isReveal = true;
		this.element.classList.remove('border--concave');
		this.element.classList.add('border--revealed');

		// dodajemy naszą klasę z miną jeśli this.mine is true
		if (this.isMine) {
			this.element.classList.add('cell--is-mine');
			return;
		}
		if (this.value) {
			this.element.textContent = this.value;
			// console.log(this.value);
			// dzieki zapisowi this.value dodajemy odpowiednią klasę do naszej komórki
			this.element.classList.add(`cell-info-${this.value}`);
		}
	}

	// metoda odpalana po kliknięciu prawym przyciskiem pozwala zdejmować i nakłądać flagę na komórki
	toggleFlag() {
		this.isFlagged = !this.isFlagged;
		// console.log(this.isFlagged);
		this.element.classList.toggle('cell--is-flag');
	}

	addMine() {
		this.isMine = true;
	}
}
