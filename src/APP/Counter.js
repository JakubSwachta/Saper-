import { UI } from './UI.js';

export class Counter extends UI {
	value = null;
	#element = null;

	// poprzez użycie metody get Elelment z UI class za pomocą QuerySeloctora łapiemy pierwszy element o atrybucie [data-counter] i przypisujemy do this.#element
	init() {
		// console.log(this.getElement(this.UiSelectors.counter));
		this.#element = this.getElement(this.UiSelectors.counter);
		// console.log(this.#element);
	}

	setValue(value) {
		this.value = value;
		this.#updateValue();
	}

	// do value dodajemy 1 i updatetujemy odpalając metodę this.#updateValue()
	increment() {
		this.value++;
		this.#updateValue();
	}

	// zmniejszamy value o 1 i updatetujemy odpalając metodę this.#updateValue()
	decrement() {
		this.value--;
		this.#updateValue();
	}

	// zmieniamy wartość value, zmieniamy teklst w wyświetlanym elemencie na zawartość value
	#updateValue() {
		// console.log(this.value);
		this.#element.textContent = this.value;
		// console.log(this.#element.textContent);
	}
}
