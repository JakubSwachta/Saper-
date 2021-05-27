import { UI } from './UI.js';

export class Timer extends UI {
	#elemetn = null;
	#interval = null;
	numberOfSeconds = 0;
	#maxNumberOfSeconds = 999;

	// przypisujemy do this.#elemetn nasz element o atrybucie [data-timer] z clasy UI
	init() {
		this.#elemetn = this.getElement(this.UiSelectors.timer);
	}
	// odpalamy naszą funkcje updateTimer co jedną sekunde
	startTimer() {
		this.#interval = setInterval(() => this.#updateTimer(), 1000);
	}
	// żeby użyć clearInterval musimy przypisać do zmiennej nasz setInterval i podać go jako parametr w clearInterval
	stopTimer() {
		clearInterval(this.#interval);
	}

	// funkcja dodaje nam do #numberOfSecond jeden oraz wywołuje funkcje setTimerValue argumentem this.#numberOfSecoond
	#updateTimer() {
		this.numberOfSeconds++;
		this.numberOfSeconds <= this.#maxNumberOfSeconds ? this.#setTimerValue(this.numberOfSeconds) : this.stopTimer();
	}
	// funkcja przypisuje do chwyconego elementu value jakie podamy wy argumencie
	// właśnie to chcemy wyświetlić e naszym oknie
	// co sekunde będzie do naszego elementu wkładane value
	#setTimerValue(value) {
		this.#elemetn.textContent = value;
	}
}
