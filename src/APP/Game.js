import { Cell } from './Cell.js';
import { UI } from './UI.js';
import { Counter } from './Counter.js';
import { Timer } from './Timer.js';
import { ResetButton } from './ResetButton.js';
import { Modal } from './Modal.js';

// extends - rozszerzamy naszą klasę o wszystkie metody z UI
class Game extends UI {
	/* --------- tworzmy obiekt konfiguracyjny, hash oznaczy prywatny z liczbą kolumn, wierszy i min ------*/
	#config = {
		easy: {
			rows: 8,
			cols: 8,
			mines: 10,
		},
		normal: {
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

	#modal = new Modal();

	#isGameFinished = false;

	#numbersOfRows = null;
	#numbersOfCols = null;
	#numbersOfMines = null;

	/* -pusta tablica do której będziemy wypychać nasze komórki -*/
	#cells = [];
	/*    będziemy chcieć klikać nasze komórki */
	#cellsElements = null;

	#cellsToReveal = 0;
	#revealedCells = 0;

	/* metoda do chwytania naszych elementów  */
	#board = null;
	#buttons = {
		modall: null,
		easy: null,
		normal: null,
		expert: null,
		reset: new ResetButton(),
	};

	/*---- podczas ładowania okna przeglądarki odpalana jest metoda initializeGame która odpala dwie kolejne metody   ----*/
	// odpala metoidy #handleElements() i #newGame()
	initializeGame() {
		this.#handleElements();
		// inicjujemy counter
		// łąpiemy elemęnt w którym wyświetlamy liczbę min(za pomocą metody getElement i selektora [data-counter])
		this.#counter.init();
		// inicjujemy Timer
		this.#timer.init();
		this.#addButtonsEventListeners();

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
		this.#timer.resetTimer();

		// ile komórek trzeba odkryć aby eygrać gre
		this.#cellsToReveal = this.#numbersOfCols * this.#numbersOfRows - this.#numbersOfMines;

		this.#setStyles();
		this.#generateCells();
		this.#renderBoard();
		this.#placeMinesInCels();
		// łąpiemy kolekcje elementów za pomocą QuerySelectora z class UI o atrbycie [data-cell] i przypisujemy
		this.#cellsElements = this.getElements(this.UiSelectors.cell);

		this.#buttons.reset.changeEmotion('neutral');

		// milieśmy zapisaną #isGameFinished na true dlatego nie mogliśmy odsłaniać komórek po restarcie gry
		this.#isGameFinished = false;
		// w stanie naszej gry była cały czas zapisana liczba odkrytych komórek
		// musimy pamiętać o resetowaniu
		this.#revealedCells = 0;

		this.#addCellsEventListners();
	}

	#endGame(isWin) {
		this.#isGameFinished = true;
		this.#timer.stopTimer();
		this.#modal.buttonText = 'Close';
		/* ----------PRZEGRANA-------- */
		// jeśli fałsz to odkryj wszystkie miny
		if (!isWin) {
			this.#revealMines();
			this.#modal.infoText = 'You lost, try again!';
			this.#buttons.reset.changeEmotion('negative');
			this.#modal.setText();
			this.#modal.toggleModal();
			return;
		}
		/*--------- WYGRANA -------------*/
		// podajemy czas w jaki wygrał użytkownik wygrał
		this.#modal.infoText =
			this.#timer.numberOfSeconds < this.#timer.maxNumberOfSeconds
				? `You won, it took you ${this.#timer.numberOfSeconds} second, congratulations!`
				: `You won, congratulations!`;
		this.#buttons.reset.changeEmotion('positive');
		this.#modal.setText();
		this.#modal.toggleModal();

		/* 	this.#modal.infoText =
			this.#timer.numberOfSeconds < this.#timer.maxNumberOfseconds
				? `You won, it took you ${this.#timer.numberOfSeconds} seconds, congratulations`
				: `You Won! Congratulations`;
		this.#buttons.reset.changeEmotion('positive');
		this.#modal.setText();
		this.#modal.toggleModal(); */
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

	// #removeCellsEventListners() {
	// 	this.#cellsElements.forEach((element) => {
	// 		element.removeEventListner('click', this.#handleCellClick);
	// 		element.removeEventListner('contextmenu', this.#handleCellContextMenu);
	// 	});
	// }

	#removeCellsEventListeners() {
		this.#cellsElements.forEach((element) => {
			element.removeEventListener('click', this.#handleCellClick);
			element.removeEventListener('contextmenu', this.#handleCellContextMenu);
		});
	}

	/* -------------- !!!!! klikanie przyciskó easy medium expert !!!!!!! ------------- */
	#addButtonsEventListeners() {
		this.#buttons.modal.addEventListener('click', this.#modal.toggleModal);

		this.#buttons.easy.addEventListener('click', () =>
			this.#handleNewGameClick(this.#config.easy.rows, this.#config.easy.cols, this.#config.easy.mines)
		);
		this.#buttons.normal.addEventListener('click', () =>
			this.#handleNewGameClick(this.#config.normal.rows, this.#config.normal.cols, this.#config.normal.mines)
		);
		this.#buttons.expert.addEventListener('click', () =>
			this.#handleNewGameClick(this.#config.expert.rows, this.#config.expert.cols, this.#config.expert.mines)
		);
		this.#buttons.reset.element.addEventListener('click', () => this.#handleNewGameClick());
	}

	// przycisk restarujący (buźka) zaczynamy od nowa na tym samym poziomie trudności
	// ustawiamy parametry defaultowe takie które odpalą się po wywołaniu funkcji bez parametrów
	#handleNewGameClick(rows = this.#numbersOfRows, cols = this.#numbersOfCols, mines = this.#numbersOfMines) {
		this.#removeCellsEventListeners();
		this.#newGame(rows, cols, mines);
	}

	// chwytamy nasz element o atrybucie '[data-board]' poprzez querySelector z metody getElement  (board, element => article) z UI class  bedziemy mogli wkłądać do niego komórki
	#handleElements() {
		this.#board = this.getElement(this.UiSelectors.board);
		/* ----- chwytamy pozostałe przyciski BUŹKA, EASY, NORMAL, EXPERT */
		// przypisujemy do odpowiedniego property naszego nowo stworzonego obiektu #buttons elementy które chwytamy po atrybucie z classy UI
		this.#buttons.modal = this.getElement(this.UiSelectors.modalButton);
		this.#buttons.easy = this.getElement(this.UiSelectors.easyButton);
		// console.log(this.#buttons.easy);
		this.#buttons.normal = this.getElement(this.UiSelectors.normalButton);
		this.#buttons.expert = this.getElement(this.UiSelectors.expertButton);
	}

	/* w pętli tworzymy nasze komórki */
	// tworzymy tablicę w której będziemy trzymać nasze komórki
	// na miejsce w tablicy "this.#cells" o indeksie "row" wrzuć pustą yablicę
	// mamy tablicę składającą się z 8 pustych tablic(rzędy)
	#generateCells() {
		// czyścimy naszą tablicę
		this.#cells.length = 0;
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
		// console.log(this.#board.firstChild.nodeName);
		// console.log(this.#board.innerHTML);
		/* -- PROBLEM */
		// cały czas po klikaniu w przyciski poziomu trudności dodają się nowe komórki do naszej tablicy ???
		// this.#board.innerHTML = ''
		while (this.#board.firstChild) {
			this.#board.removeChild(this.#board.firstChild);
		}
		// spłaszcamy, tweorzymy tablicę jedno wymiarową i dla każdego jej elementu
		/*---  do anszego #board() "element chwycony za pomocą atrybutu '[data-board]' [czyli nasza plansza article] w funkcji handleElements"
	   dodajemy jako ostatnie dziecko metodę createElement(którą wywołujemy na obiekcie cell czyli naszym elemencie z for each) z Cells.js która zraca nam const element z nasszym divem  ---*/
		// każdemu property element w każdym obiekcie cell  zostaje przpisane po znaku = document.querySelector(selector) poprzez wywołąnie metody createElement() na obiekcie cell z UI.js
		// selektorem w typ wypadku jest cell.selector property które ma wartosć `[data-x="${this.x}"][data-y="${this.y}"]`
		// po tym selektorze łapiemy naszego diva
		this.#cells.flat().forEach((cell) => {
			this.#board.insertAdjacentHTML('beforeend', cell.createElement());
			cell.element = cell.getElement(cell.selector);
			// console.log(cell);
		});
		// console.log(this.#board);
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
			// nie ma miny -> łaściwość cell.isMine jest false to odpali się metoda addMine która doda nam mine oraz zmniejszy minesToPlace o jeden
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
		//  wywołujemy metodę revealCell z class Cell a komórkę przekazujemy jako parametr
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
	// funkcja jest wywoływana po kliknięciu w komórkę
	#clickCell(cell) {
		// jeśli to jest prawdą to nie możemy kliknąć
		if (this.#isGameFinished || cell.isFlagged) return;
		if (cell.isMine) {
			// argument false bo przegrywamy
			this.#endGame(false);
		}
		this.#setCellValue(cell);

		if (this.#revealedCells === this.#cellsToReveal && !this.#isGameFinished) {
			this.#endGame(true);
		}
	}
	/*------- odsłaniamy wszystkie miny po skończonej grze --------- */
	// filtrujemy nasze komórki które są miną
	// if cell.isMine jest true z metody filter to znaczy żmają minę
	#revealMines() {
		this.#cells
			.flat()
			.filter(({ isMine }) => isMine)
			.forEach((cell) => cell.revealCell());
	}

	/* -------chcemy zobaczyć ile w sąsiadujących komórkach znajduje sie min -------*/
	//  w pętli for wykonujemy iteracje ponaszej tablicy dwuwymiarowej, w pierwszej pętli odnajdujemy komórkę o jeden mniejszą od naszej i wykonujemy do o jeden większej
	// w kolejnej pętli schodzimy do rzędów i tam odnajdujemy o jeden mniejszy od klikniętego i wykonujemy do o jeden większego
	#setCellValue(cell) {
		let minesCount = 0;
		// dla skrajnych komórek nie możemy iść w jedną stronę dlatego używamy funkcji Math
		// u żywamywamy funkcji Math.max wybieramy największą liczbę z podanych czyli np. miendzy (cell - 1 a 0)
		// Math.min - this.#numberOfRows to jset 8, cell.y + 1 w przypadku skrajnej komórki nie istnieje
		// pierwsza pętla bedzie wykonywać się dopóki rowIndex będzię mniejszy bądźrówny wartośći mniejszej z tych dwóch(cell.y + 1 oraz this.#numberOfRows - 1 )
		for (
			let rowIndex = Math.max(cell.y - 1, 0);
			rowIndex <= Math.min(cell.y + 1, this.#numbersOfRows - 1);
			rowIndex++
		) {
			for (
				let colIndex = Math.max(cell.x - 1, 0);
				colIndex <= Math.min(cell.x + 1, this.#numbersOfCols - 1);
				colIndex++
			) {
				// jeślo komórka o podanych indexach jest miną to  zwiększamy minesCount o jeden
				if (this.#cells[rowIndex][colIndex].isMine) minesCount++;
			}
		}

		cell.value = minesCount;
		cell.revealCell();
		// zwiększamy ilość odkrytych komórek
		this.#revealedCells++;
		/* -----   Odkrywamy pola automatycznie jeśli nie są otoczone miną ------ */
		// jeśli cell.value równa się zero (czyli negacja) to robimy jeszcze raz pętle w pętli
		if (!cell.value) {
			for (
				let rowIndex = Math.max(cell.y - 1, 0);
				rowIndex <= Math.min(cell.y + 1, this.#numbersOfRows - 1);
				rowIndex++
			) {
				for (
					let colIndex = Math.max(cell.x - 1, 0);
					colIndex <= Math.min(cell.x + 1, this.#numbersOfCols - 1);
					colIndex++
				) {
					const cell = this.#cells[rowIndex][colIndex];
					// jeślo komórka o podanych indexach nie jest odkryta to wywołujemy metodę clickCell()
					if (!cell.isReveal) {
						this.#clickCell(cell);
					}
				}
			}
		}
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
