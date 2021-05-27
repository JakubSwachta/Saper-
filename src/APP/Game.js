import { Cell } from './Cell.js';
import { UI } from './UI.js';
import { Counter } from './Counter.js';
import { Timer } from './Timer.js';

// extends - rozszerzamy naszą klasę o wszystkie metody z UI
class Game extends UI {
	/* --------- tworzmy obiekt konfiguracyjny, hash oznaczy prywatny z liczbą kolumn, wierszy i min ------*/
	#config = {
		easy: {
			rows: 8,
			cols: 8,
			mines: 10,
		},
		medium: {
			rows: 16,
			cols: 16,
			mines: 40,
		},
		expert: {
			rows: 16,
			cols: 30,
			mines: 99,
		},
	};

	// nowy obiekt Counter będocy instancją naszej klasy Counter
	#counter = new Counter();
	#timer = new Timer();

	#isGameFinished = false;

	#numbersOfRows = null;
	#numbersOfCols = null;
	#numbersOfMines = null;

	/* -pusta tablica do której będziemy wypychać nasze komórki -*/
	#cells = [];
	/*    będziemy chcieć klikać nasze komórki */
	#cellsElements = null;

	/* metoda do chwytania naszych elementów  */
	#board = null;

	/*---- podczas ładowania okna przeglądarki odpalana jest metoda initializeGame która odpala dwie kolejne metody   ----*/
	// odpala metoidy #handleElements() i #newGame()
	initializeGame() {
		this.#handleElements();
		// inicjujemy counter
		// łąpiemy elemęnt w którym wyświetlamy liczbę min(za pomocą metody getElement i selektora [data-counter])
		this.#counter.init();
		// inicjujemy Timer
		this.#timer.init();
		this.#newGame();
	}
	/* --- Domyślnie jeśli urzytkownik uruchomi sobie kartę przeglądarki to pokazujemy poziom łątwy ---- */
	#newGame(rows = this.#config.easy.rows, cols = this.#config.easy.cols, mines = this.#config.easy.mines) {
		this.#numbersOfRows = rows;
		this.#numbersOfCols = cols;
		this.#numbersOfMines = mines;
		// console.log(this.#numbersOfMines);
		// mnetoda przypisuje do naszego value które wykorzystujemy w updateValue liczbę min
		this.#counter.setValue(this.#numbersOfMines);
		this.#timer.startTimer();

		this.#setStyles();
		this.#generateCells();
		this.#renderBoard();
		this.#placeMinesInCels();
		// łąpiemy kolekcje elementów za pomocą QuerySelectora z class UI o atrbycie [data-cell] i przypisujemy
		this.#cellsElements = this.getElements(this.UiSelectors.cell);

		this.#addCellsEventListners();
	}

	#endGame(isWin) {
		this.#isGameFinished = true;
		this.#timer.stopTimer();

		if (!isWin) {
			this.#revealMines();
		}
	}

	/*------!!! klikanie na komórki!!!------*/
	// dodajemy metode obsługująca zdarzenia dla wszystkich naszych komorek lewy klik odsłonięcie komórki, prawy bedziemy ustawiali flagę na komórce
	// contextmenu czyli kliknięcie prawym przyciskiem myszy
	#addCellsEventListners() {
		this.#cellsElements.forEach((element) => {
			element.addEventListener('click', this.#handleCellClick);
			element.addEventListener('contextmenu', this.#handleCellContextMenu);
		});
	}

	// chwytamy nasz element o atrybucie '[data-board]' poprzez querySelector z metody getElement  (board, element => article) z UI class  bedziemy mogli wkłądać do niego komórki
	#handleElements() {
		this.#board = this.getElement(this.UiSelectors.board);
	}

	/* w pętli tworzymy nasze komórki */
	// tworzymy tablicę w której będziemy trzymać nasze komórki
	// na miejsce w tablicy "this.#cells" o indeksie "row" wrzuć pustą yablicę
	// mamy tablicę składającą się z 8 pustych tablic(rzędy)
	#generateCells() {
		for (let row = 0; row < this.#numbersOfRows; row++) {
			this.#cells[row] = [];
			// console.log(this.#cells);
			for (let col = 0; col < this.#numbersOfCols; col++) {
				// tutaj chcielibyśmy wepchnąć naszą komrókę (z Cell.js)
				// cel i row miejsca w tablicy cells(zwarte w konstuktorze)
				// nowy obiekt  będący instacją classy Cell push na miejsce (col, row) czyli x,y z konstruktora
				this.#cells[row].push(new Cell(col, row));
			}
		}
		//console.log(this.#cells);
	}
	/* -- metoda która będzie nam tworzyłą elementy które */
	#renderBoard() {
		// spłaszcamy, tweorzymy tablicę jedno wymiarową i dla każdego jej elementu
		/*---  do anszego #board() "element chwycony za pomocą atrybutu '[data-board]' [czyli nasza plansza article]"
       dodajemy jako ostatnie dziecko metodę createElement(którą wywołujemy na obiekcie cell czyli naszym elemencie z for each) z Cells.js która zraca nam const element z nasszym divem  ---*/
		// każdemu property element w każdym obiekcie cell  zostaje przpisane po znaku = document.querySelector(selector) poprzez wywołąnie metody createElement() na obiekcie cell z UI.js
		// selektorem w typ wypadku jest cell.selector property które ma wartosć `[data-x="${this.x}"][data-y="${this.y}"]`
		// po tym selektorze łapiemy naszego diva
		this.#cells.flat().forEach((cell) => {
			this.#board.insertAdjacentHTML('beforeend', cell.createElement());
			cell.element = cell.getElement(cell.selector);
			// console.log(cell);
		});
	}

	// tworzymy metode odpoowiedzialną za rozmieszczenie min
	// przypisujemy liczbę min do zmiennej
	// W pętli przypisujemy wylosowane liczby do zmiennych
	// używamy zmiennych jako indeksów w naszej komórce
	#placeMinesInCels() {
		let minesToPlace = this.#numbersOfMines;

		while (minesToPlace) {
			const rowIndex = this.#getRandomInteger(0, this.#numbersOfRows - 1);
			const colIndex = this.#getRandomInteger(0, this.#numbersOfCols - 1);

			const cell = this.#cells[rowIndex][colIndex];

			const hasCellMine = cell.isMine;
			// jeśli nasza komórka cell do której przypisaliśmy poszczególną komórkę za po mocą this.#cells[rowIndex][colIndex];
			// ma minę -> łaściwość cell.isMine jest false to odpali się metoda addMine która doda nam mine oraz zmniejszy minesToPlace o jeden
			if (!hasCellMine) {
				cell.addMine();
				minesToPlace--;
				// console.log(minesToPlace);
			}
		}
	}

	/*------!!! klikanie na kórkę LEWYM przyciskiem  !!!------*/
	/* dodajemy metody które wywołujemy w naszym addEventListner */
	// target element na którym wywołana zdarzenie
	// funkcja handleCellClick przypisze nam do zmiennej ten element na który klikniemy
	// następnie pobierzemy wartość atrybutu dla tego elementu
	#handleCellClick = (e) => {
		const target = e.target;
		// zmienne w których trzymamy index naszego wiersza
		// get atribute zwraca nam wartość atrybutu w tym wypadku stringa
		// zmieniamy stringa na liczbę za pomocą parseInt
		const rowIndex = parseInt(target.getAttribute('data-y'), 10);
		const colIndex = parseInt(target.getAttribute('data-x'), 10);

		// Mamy tablice dwuwymiarową a w zmiennych  przetrzymujemy lokalizację naszych komórek
		// na komórce o podnym indeksie wywołąmy metodę revealCell z class Cell
		const cell = this.#cells[rowIndex][colIndex];
		this.#clickCell(cell);
	};

	/*------!!! klikanie na kórkę PRAWYM przyciskiem  !!!------*/
	// metoda która będzie wywoływana  po praywm kliknięciu
	// funkcja strzałkowa aby nie zgubić kontesktu
	#handleCellContextMenu = (e) => {
		// nie chemy żęby wyświetlało się menu kontekstowe po kliknieciu prawym
		e.preventDefault();
		const target = e.target;
		// zmienne w których trzymamy index naszego wiersza
		const rowIndex = parseInt(target.getAttribute('data-y'), 10);
		const colIndex = parseInt(target.getAttribute('data-x'), 10);

		const cell = this.#cells[rowIndex][colIndex];
		if (cell.isReveal || this.#isGameFinished) return;
		// console.log(cell.isReveal);
		/* ----- wyświetlamy liczbę flag w naszym oknie  ------ */
		// jeśli mamy flagę oznaczoną to
		if (cell.isFlagged) {
			this.#counter.increment();
			cell.toggleFlag();
			return;
		}

		// konwertujemy do wartości bolean jeden ! zamienia nam true na false adrugi false zpowrotem na true
		// jeśli by nie było tego if to możemy wejść na minusowe wartości
		if (!!this.#counter.value) {
			this.#counter.decrement();
			cell.toggleFlag();
		}
	};
	// sprwdzamy czy dana komórka jest miną
	#clickCell(cell) {
		if (this.#isGameFinished || cell.isFlagged) return;
		if (cell.isMine) {
			this.#endGame(false);
		}
		cell.revealCell();
	}
	// filtrujemy nasze komórki które są miną
	// if cell.isMine jest true z metody filter to znaczy żmają minę
	#revealMines() {
		this.#cells
			.flat()
			.filter(({ isMine }) => isMine)
			.forEach((cell) => cell.revealCell());
	}

	/* tworzymy metodę która bedzie dopasowywać maksymalną szerokość naszego board z komórkami do ilości komórek w rzedzie */
	// łapiemy naszą ustawioną właściowść z css [--cells-in-row] i na jej miejsce wstawiamy wartość z [this.#numbersOfCols]
	#setStyles() {
		document.documentElement.style.setProperty('--cells-in-row', this.#numbersOfCols);
	}

	// losujemy liczbę któa będzie potrzebna w metodzie placeMinesInCels
	#getRandomInteger(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
}

/* ----- przy załadowaniu strony odpali się funkcja która storzy obiekt game będący isntacją klasy Game---- */
/*---- zostanie także urruchomiona metoda initializeGame ----*/
window.onload = function () {
	const game = new Game();
	// console.log(game);

	game.initializeGame();
};