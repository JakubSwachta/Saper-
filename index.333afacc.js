// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

(function(modules, entry, mainEntry, parcelRequireName, globalName) {
  /* eslint-disable no-undef */
  var globalObject =
    typeof globalThis !== 'undefined'
      ? globalThis
      : typeof self !== 'undefined'
      ? self
      : typeof window !== 'undefined'
      ? window
      : typeof global !== 'undefined'
      ? global
      : {};
  /* eslint-enable no-undef */

  // Save the require from previous bundle to this closure if any
  var previousRequire =
    typeof globalObject[parcelRequireName] === 'function' &&
    globalObject[parcelRequireName];

  var cache = previousRequire.cache || {};
  // Do not use `require` to prevent Webpack from trying to bundle this call
  var nodeRequire =
    typeof module !== 'undefined' &&
    typeof module.require === 'function' &&
    module.require.bind(module);

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire =
          typeof globalObject[parcelRequireName] === 'function' &&
          globalObject[parcelRequireName];
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error("Cannot find module '" + name + "'");
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = (cache[name] = new newRequire.Module(name));

      modules[name][0].call(
        module.exports,
        localRequire,
        module,
        module.exports,
        this,
      );
    }

    return cache[name].exports;

    function localRequire(x) {
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x) {
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function(id, exports) {
    modules[id] = [
      function(require, module) {
        module.exports = exports;
      },
      {},
    ];
  };

  Object.defineProperty(newRequire, 'root', {
    get: function() {
      return globalObject[parcelRequireName];
    },
  });

  globalObject[parcelRequireName] = newRequire;

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (mainEntry) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(mainEntry);

    // CommonJS
    if (typeof exports === 'object' && typeof module !== 'undefined') {
      module.exports = mainExports;

      // RequireJS
    } else if (typeof define === 'function' && define.amd) {
      define(function() {
        return mainExports;
      });

      // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }
})({"Qx6MO":[function(require,module,exports) {
var HMR_HOST = null;
var HMR_PORT = null;
var HMR_SECURE = false;
var HMR_ENV_HASH = "d751713988987e9331980363e24189ce";
module.bundle.HMR_BUNDLE_ID = "8f527a37d7e41f87f316cdba333afacc"; // @flow
/* global HMR_HOST, HMR_PORT, HMR_ENV_HASH, HMR_SECURE */ /*::
import type {
  HMRAsset,
  HMRMessage,
} from '@parcel/reporter-dev-server/src/HMRServer.js';
interface ParcelRequire {
  (string): mixed;
  cache: {|[string]: ParcelModule|};
  hotData: mixed;
  Module: any;
  parent: ?ParcelRequire;
  isParcelRequire: true;
  modules: {|[string]: [Function, {|[string]: string|}]|};
  HMR_BUNDLE_ID: string;
  root: ParcelRequire;
}
interface ParcelModule {
  hot: {|
    data: mixed,
    accept(cb: (Function) => void): void,
    dispose(cb: (mixed) => void): void,
    // accept(deps: Array<string> | string, cb: (Function) => void): void,
    // decline(): void,
    _acceptCallbacks: Array<(Function) => void>,
    _disposeCallbacks: Array<(mixed) => void>,
  |};
}
declare var module: {bundle: ParcelRequire, ...};
declare var HMR_HOST: string;
declare var HMR_PORT: string;
declare var HMR_ENV_HASH: string;
declare var HMR_SECURE: boolean;
*/ var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;
function Module(moduleName) {
    OldModule.call(this, moduleName);
    this.hot = {
        data: module.bundle.hotData,
        _acceptCallbacks: [],
        _disposeCallbacks: [],
        accept: function(fn) {
            this._acceptCallbacks.push(fn || function() {
            });
        },
        dispose: function(fn) {
            this._disposeCallbacks.push(fn);
        }
    };
    module.bundle.hotData = undefined;
}
module.bundle.Module = Module;
var checkedAssets/*: {|[string]: boolean|} */ , acceptedAssets/*: {|[string]: boolean|} */ , assetsToAccept/*: Array<[ParcelRequire, string]> */ ;
function getHostname() {
    return HMR_HOST || (location.protocol.indexOf('http') === 0 ? location.hostname : 'localhost');
}
function getPort() {
    return HMR_PORT || location.port;
}
// eslint-disable-next-line no-redeclare
var parent = module.bundle.parent;
if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
    var hostname = getHostname();
    var port = getPort();
    var protocol = HMR_SECURE || location.protocol == 'https:' && !/localhost|127.0.0.1|0.0.0.0/.test(hostname) ? 'wss' : 'ws';
    var ws = new WebSocket(protocol + '://' + hostname + (port ? ':' + port : '') + '/');
    // $FlowFixMe
    ws.onmessage = function(event/*: {data: string, ...} */ ) {
        checkedAssets = {
        };
        acceptedAssets = {
        };
        assetsToAccept = [];
        var data = JSON.parse(event.data);
        if (data.type === 'update') {
            // Remove error overlay if there is one
            removeErrorOverlay();
            let assets = data.assets.filter((asset)=>asset.envHash === HMR_ENV_HASH
            );
            // Handle HMR Update
            var handled = false;
            assets.forEach((asset)=>{
                var didAccept = asset.type === 'css' || asset.type === 'js' && hmrAcceptCheck(module.bundle.root, asset.id, asset.depsByBundle);
                if (didAccept) handled = true;
            });
            if (handled) {
                console.clear();
                assets.forEach(function(asset) {
                    hmrApply(module.bundle.root, asset);
                });
                for(var i = 0; i < assetsToAccept.length; i++){
                    var id = assetsToAccept[i][1];
                    if (!acceptedAssets[id]) hmrAcceptRun(assetsToAccept[i][0], id);
                }
            } else window.location.reload();
        }
        if (data.type === 'error') {
            // Log parcel errors to console
            for (let ansiDiagnostic of data.diagnostics.ansi){
                let stack = ansiDiagnostic.codeframe ? ansiDiagnostic.codeframe : ansiDiagnostic.stack;
                console.error('🚨 [parcel]: ' + ansiDiagnostic.message + '\n' + stack + '\n\n' + ansiDiagnostic.hints.join('\n'));
            }
            // Render the fancy html overlay
            removeErrorOverlay();
            var overlay = createErrorOverlay(data.diagnostics.html);
            // $FlowFixMe
            document.body.appendChild(overlay);
        }
    };
    ws.onerror = function(e) {
        console.error(e.message);
    };
    ws.onclose = function(e) {
        console.warn('[parcel] 🚨 Connection to the HMR server was lost');
    };
}
function removeErrorOverlay() {
    var overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
        overlay.remove();
        console.log('[parcel] ✨ Error resolved');
    }
}
function createErrorOverlay(diagnostics) {
    var overlay = document.createElement('div');
    overlay.id = OVERLAY_ID;
    let errorHTML = '<div style="background: black; opacity: 0.85; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; font-family: Menlo, Consolas, monospace; z-index: 9999;">';
    for (let diagnostic of diagnostics){
        let stack = diagnostic.codeframe ? diagnostic.codeframe : diagnostic.stack;
        errorHTML += `\n      <div>\n        <div style="font-size: 18px; font-weight: bold; margin-top: 20px;">\n          🚨 ${diagnostic.message}\n        </div>\n        <pre>\n          ${stack}\n        </pre>\n        <div>\n          ${diagnostic.hints.map((hint)=>'<div>' + hint + '</div>'
        ).join('')}\n        </div>\n      </div>\n    `;
    }
    errorHTML += '</div>';
    overlay.innerHTML = errorHTML;
    return overlay;
}
function getParents(bundle, id) /*: Array<[ParcelRequire, string]> */ {
    var modules = bundle.modules;
    if (!modules) return [];
    var parents = [];
    var k, d, dep;
    for(k in modules)for(d in modules[k][1]){
        dep = modules[k][1][d];
        if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) parents.push([
            bundle,
            k
        ]);
    }
    if (bundle.parent) parents = parents.concat(getParents(bundle.parent, id));
    return parents;
}
function updateLink(link) {
    var newLink = link.cloneNode();
    newLink.onload = function() {
        if (link.parentNode !== null) // $FlowFixMe
        link.parentNode.removeChild(link);
    };
    newLink.setAttribute('href', // $FlowFixMe
    link.getAttribute('href').split('?')[0] + '?' + Date.now());
    // $FlowFixMe
    link.parentNode.insertBefore(newLink, link.nextSibling);
}
var cssTimeout = null;
function reloadCSS() {
    if (cssTimeout) return;
    cssTimeout = setTimeout(function() {
        var links = document.querySelectorAll('link[rel="stylesheet"]');
        for(var i = 0; i < links.length; i++){
            // $FlowFixMe[incompatible-type]
            var href = links[i].getAttribute('href');
            var hostname = getHostname();
            var servedFromHMRServer = hostname === 'localhost' ? new RegExp('^(https?:\\/\\/(0.0.0.0|127.0.0.1)|localhost):' + getPort()).test(href) : href.indexOf(hostname + ':' + getPort());
            var absolute = /^https?:\/\//i.test(href) && href.indexOf(window.location.origin) !== 0 && !servedFromHMRServer;
            if (!absolute) updateLink(links[i]);
        }
        cssTimeout = null;
    }, 50);
}
function hmrApply(bundle/*: ParcelRequire */ , asset/*:  HMRAsset */ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (asset.type === 'css') {
        reloadCSS();
        return;
    }
    let deps = asset.depsByBundle[bundle.HMR_BUNDLE_ID];
    if (deps) {
        var fn = new Function('require', 'module', 'exports', asset.output);
        modules[asset.id] = [
            fn,
            deps
        ];
    } else if (bundle.parent) hmrApply(bundle.parent, asset);
}
function hmrAcceptCheck(bundle/*: ParcelRequire */ , id/*: string */ , depsByBundle/*: ?{ [string]: { [string]: string } }*/ ) {
    var modules = bundle.modules;
    if (!modules) return;
    if (depsByBundle && !depsByBundle[bundle.HMR_BUNDLE_ID]) {
        // If we reached the root bundle without finding where the asset should go,
        // there's nothing to do. Mark as "accepted" so we don't reload the page.
        if (!bundle.parent) return true;
        return hmrAcceptCheck(bundle.parent, id, depsByBundle);
    }
    if (checkedAssets[id]) return;
    checkedAssets[id] = true;
    var cached = bundle.cache[id];
    assetsToAccept.push([
        bundle,
        id
    ]);
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) return true;
    return getParents(module.bundle.root, id).some(function(v) {
        return hmrAcceptCheck(v[0], v[1], null);
    });
}
function hmrAcceptRun(bundle/*: ParcelRequire */ , id/*: string */ ) {
    var cached = bundle.cache[id];
    bundle.hotData = {
    };
    if (cached && cached.hot) cached.hot.data = bundle.hotData;
    if (cached && cached.hot && cached.hot._disposeCallbacks.length) cached.hot._disposeCallbacks.forEach(function(cb) {
        cb(bundle.hotData);
    });
    delete bundle.cache[id];
    bundle(id);
    cached = bundle.cache[id];
    if (cached && cached.hot && cached.hot._acceptCallbacks.length) cached.hot._acceptCallbacks.forEach(function(cb) {
        var assetsToAlsoAccept = cb(function() {
            return getParents(module.bundle.root, id);
        });
        if (assetsToAlsoAccept && assetsToAccept.length) assetsToAccept.push.apply(assetsToAccept, assetsToAlsoAccept);
    });
    acceptedAssets[id] = true;
}

},{}],"4GXql":[function(require,module,exports) {
var _cellJs = require("./Cell.js");
var _uiJs = require("./UI.js");
var _counterJs = require("./Counter.js");
var _timerJs = require("./Timer.js");
var _resetButtonJs = require("./ResetButton.js");
var _modalJs = require("./Modal.js");
// extends - rozszerzamy naszą klasę o wszystkie metody z UI
class Game extends _uiJs.UI {
    /* --------- tworzmy obiekt konfiguracyjny, hash oznaczy prywatny z liczbą kolumn, wierszy i min ------*/ #config = {
        easy: {
            rows: 8,
            cols: 8,
            mines: 10
        },
        normal: {
            rows: 16,
            cols: 16,
            mines: 40
        },
        expert: {
            rows: 16,
            cols: 30,
            mines: 99
        }
    };
    // nowy obiekt Counter będocy instancją naszej klasy Counter
    #counter = new _counterJs.Counter();
    #timer = new _timerJs.Timer();
    #modal = new _modalJs.Modal();
    #isGameFinished = false;
    #numbersOfRows = null;
    #numbersOfCols = null;
    #numbersOfMines = null;
    /* -pusta tablica do której będziemy wypychać nasze komórki -*/ #cells = [];
    /*    będziemy chcieć klikać nasze komórki */ #cellsElements = null;
    #cellsToReveal = 0;
    #revealedCells = 0;
    /* metoda do chwytania naszych elementów  */ #board = null;
    #buttons = {
        modall: null,
        easy: null,
        normal: null,
        expert: null,
        reset: new _resetButtonJs.ResetButton()
    };
    /*---- podczas ładowania okna przeglądarki odpalana jest metoda initializeGame która odpala dwie kolejne metody   ----*/ // odpala metoidy #handleElements() i #newGame()
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
    /* --- Domyślnie jeśli urzytkownik uruchomi sobie kartę przeglądarki to pokazujemy poziom łątwy ---- */  #newGame(rows = this.#config.easy.rows, cols = this.#config.easy.cols, mines = this.#config.easy.mines) {
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
        /* ----------PRZEGRANA-------- */ // jeśli fałsz to odkryj wszystkie miny
        if (!isWin) {
            this.#revealMines();
            this.#modal.infoText = 'You lost, try again!';
            this.#buttons.reset.changeEmotion('negative');
            this.#modal.setText();
            this.#modal.toggleModal();
            return;
        }
        /*--------- WYGRANA -------------*/ // podajemy czas w jaki wygrał użytkownik wygrał
        this.#modal.infoText = this.#timer.numberOfSeconds < this.#timer.maxNumberOfSeconds ? `You won, it took you ${this.#timer.numberOfSeconds} second, congratulations!` : `You won, congratulations!`;
        this.#buttons.reset.changeEmotion('positive');
        this.#modal.setText();
        this.#modal.toggleModal();
    /* 	this.#modal.infoText =
			this.#timer.numberOfSeconds < this.#timer.maxNumberOfseconds
				? `You won, it took you ${this.#timer.numberOfSeconds} seconds, congratulations`
				: `You Won! Congratulations`;
		this.#buttons.reset.changeEmotion('positive');
		this.#modal.setText();
		this.#modal.toggleModal(); */ }
    /*------!!! klikanie na komórki!!!------*/ // dodajemy metode obsługująca zdarzenia dla wszystkich naszych komorek lewy klik odsłonięcie komórki, prawy bedziemy ustawiali flagę na komórce
    // contextmenu czyli kliknięcie prawym przyciskiem myszy
     #addCellsEventListners() {
        this.#cellsElements.forEach((element)=>{
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
        this.#cellsElements.forEach((element)=>{
            element.removeEventListener('click', this.#handleCellClick);
            element.removeEventListener('contextmenu', this.#handleCellContextMenu);
        });
    }
    /* -------------- !!!!! klikanie przyciskó easy medium expert !!!!!!! ------------- */  #addButtonsEventListeners() {
        this.#buttons.modal.addEventListener('click', this.#modal.toggleModal);
        this.#buttons.easy.addEventListener('click', ()=>this.#handleNewGameClick(this.#config.easy.rows, this.#config.easy.cols, this.#config.easy.mines)
        );
        this.#buttons.normal.addEventListener('click', ()=>this.#handleNewGameClick(this.#config.normal.rows, this.#config.normal.cols, this.#config.normal.mines)
        );
        this.#buttons.expert.addEventListener('click', ()=>this.#handleNewGameClick(this.#config.expert.rows, this.#config.expert.cols, this.#config.expert.mines)
        );
        this.#buttons.reset.element.addEventListener('click', ()=>this.#handleNewGameClick()
        );
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
        /* ----- chwytamy pozostałe przyciski BUŹKA, EASY, NORMAL, EXPERT */ // przypisujemy do odpowiedniego property naszego nowo stworzonego obiektu #buttons elementy które chwytamy po atrybucie z classy UI
        this.#buttons.modal = this.getElement(this.UiSelectors.modalButton);
        this.#buttons.easy = this.getElement(this.UiSelectors.easyButton);
        // console.log(this.#buttons.easy);
        this.#buttons.normal = this.getElement(this.UiSelectors.normalButton);
        this.#buttons.expert = this.getElement(this.UiSelectors.expertButton);
    }
    /* w pętli tworzymy nasze komórki */ // tworzymy tablicę w której będziemy trzymać nasze komórki
    // na miejsce w tablicy "this.#cells" o indeksie "row" wrzuć pustą yablicę
    // mamy tablicę składającą się z 8 pustych tablic(rzędy)
     #generateCells() {
        // czyścimy naszą tablicę
        this.#cells.length = 0;
        for(let row = 0; row < this.#numbersOfRows; row++){
            this.#cells[row] = [];
            // console.log(this.#cells);
            for(let col = 0; col < this.#numbersOfCols; col++)// tutaj chcielibyśmy wepchnąć naszą komrókę (z Cell.js)
            // cel i row miejsca w tablicy cells(zwarte w konstuktorze)
            // nowy obiekt  będący instacją classy Cell push na miejsce (col, row) czyli x,y z konstruktora
            this.#cells[row].push(new _cellJs.Cell(col, row));
        }
    //console.log(this.#cells);
    }
    /* -- metoda która będzie nam tworzyłą elementy które */  #renderBoard() {
        // console.log(this.#board.firstChild.nodeName);
        // console.log(this.#board.innerHTML);
        /* -- PROBLEM */ // cały czas po klikaniu w przyciski poziomu trudności dodają się nowe komórki do naszej tablicy ???
        // this.#board.innerHTML = ''
        while(this.#board.firstChild)this.#board.removeChild(this.#board.firstChild);
        // spłaszcamy, tweorzymy tablicę jedno wymiarową i dla każdego jej elementu
        /*---  do anszego #board() "element chwycony za pomocą atrybutu '[data-board]' [czyli nasza plansza article] w funkcji handleElements"
	   dodajemy jako ostatnie dziecko metodę createElement(którą wywołujemy na obiekcie cell czyli naszym elemencie z for each) z Cells.js która zraca nam const element z nasszym divem  ---*/ // każdemu property element w każdym obiekcie cell  zostaje przpisane po znaku = document.querySelector(selector) poprzez wywołąnie metody createElement() na obiekcie cell z UI.js
        // selektorem w typ wypadku jest cell.selector property które ma wartosć `[data-x="${this.x}"][data-y="${this.y}"]`
        // po tym selektorze łapiemy naszego diva
        this.#cells.flat().forEach((cell)=>{
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
        while(minesToPlace){
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
    /*------!!! klikanie na kórkę LEWYM przyciskiem  !!!------*/ /* dodajemy metody które wywołujemy w naszym addEventListner */ // target element na którym wywołana zdarzenie
    // funkcja handleCellClick przypisze nam do zmiennej ten element na który klikniemy
    // następnie pobierzemy wartość atrybutu dla tego elementu
    #handleCellClick = (e)=>{
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
    /*------!!! klikanie na kórkę PRAWYM przyciskiem  !!!------*/ // metoda która będzie wywoływana  po praywm kliknięciu
    // funkcja strzałkowa aby nie zgubić kontesktu
    #handleCellContextMenu = (e)=>{
        // nie chemy żęby wyświetlało się menu kontekstowe po kliknieciu prawym
        e.preventDefault();
        const target = e.target;
        // zmienne w których trzymamy index naszego wiersza
        const rowIndex = parseInt(target.getAttribute('data-y'), 10);
        const colIndex = parseInt(target.getAttribute('data-x'), 10);
        const cell = this.#cells[rowIndex][colIndex];
        if (cell.isReveal || this.#isGameFinished) return;
        // console.log(cell.isReveal);
        /* ----- wyświetlamy liczbę flag w naszym oknie  ------ */ // jeśli mamy flagę oznaczoną to
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
        if (cell.isMine) // argument false bo przegrywamy
        this.#endGame(false);
        this.#setCellValue(cell);
        if (this.#revealedCells === this.#cellsToReveal && !this.#isGameFinished) this.#endGame(true);
    }
    /*------- odsłaniamy wszystkie miny po skończonej grze --------- */ // filtrujemy nasze komórki które są miną
    // if cell.isMine jest true z metody filter to znaczy żmają minę
     #revealMines() {
        this.#cells.flat().filter(({ isMine  })=>isMine
        ).forEach((cell)=>cell.revealCell()
        );
    }
    /* -------chcemy zobaczyć ile w sąsiadujących komórkach znajduje sie min -------*/ //  w pętli for wykonujemy iteracje ponaszej tablicy dwuwymiarowej, w pierwszej pętli odnajdujemy komórkę o jeden mniejszą od naszej i wykonujemy do o jeden większej
    // w kolejnej pętli schodzimy do rzędów i tam odnajdujemy o jeden mniejszy od klikniętego i wykonujemy do o jeden większego
     #setCellValue(cell) {
        let minesCount = 0;
        // dla skrajnych komórek nie możemy iść w jedną stronę dlatego używamy funkcji Math
        // u żywamywamy funkcji Math.max wybieramy największą liczbę z podanych czyli np. miendzy (cell - 1 a 0)
        // Math.min - this.#numberOfRows to jset 8, cell.y + 1 w przypadku skrajnej komórki nie istnieje
        // pierwsza pętla bedzie wykonywać się dopóki rowIndex będzię mniejszy bądźrówny wartośći mniejszej z tych dwóch(cell.y + 1 oraz this.#numberOfRows - 1 )
        for(let rowIndex = Math.max(cell.y - 1, 0); rowIndex <= Math.min(cell.y + 1, this.#numbersOfRows - 1); rowIndex++){
            for(let colIndex = Math.max(cell.x - 1, 0); colIndex <= Math.min(cell.x + 1, this.#numbersOfCols - 1); colIndex++)// jeślo komórka o podanych indexach jest miną to  zwiększamy minesCount o jeden
            if (this.#cells[rowIndex][colIndex].isMine) minesCount++;
        }
        cell.value = minesCount;
        cell.revealCell();
        // zwiększamy ilość odkrytych komórek
        this.#revealedCells++;
        /* -----   Odkrywamy pola automatycznie jeśli nie są otoczone miną ------ */ // jeśli cell.value równa się zero (czyli negacja) to robimy jeszcze raz pętle w pętli
        if (!cell.value) {
            for(let rowIndex1 = Math.max(cell.y - 1, 0); rowIndex1 <= Math.min(cell.y + 1, this.#numbersOfRows - 1); rowIndex1++)for(let colIndex = Math.max(cell.x - 1, 0); colIndex <= Math.min(cell.x + 1, this.#numbersOfCols - 1); colIndex++){
                const cell = this.#cells[rowIndex1][colIndex];
                // jeślo komórka o podanych indexach nie jest odkryta to wywołujemy metodę clickCell()
                if (!cell.isReveal) this.#clickCell(cell);
            }
        }
    }
    /* tworzymy metodę która bedzie dopasowywać maksymalną szerokość naszego board z komórkami do ilości komórek w rzedzie */ // łapiemy naszą ustawioną właściowść z css [--cells-in-row] i na jej miejsce wstawiamy wartość z [this.#numbersOfCols]
     #setStyles() {
        document.documentElement.style.setProperty('--cells-in-row', this.#numbersOfCols);
    }
    // losujemy liczbę któa będzie potrzebna w metodzie placeMinesInCels
     #getRandomInteger(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }
}
/* ----- przy załadowaniu strony odpali się funkcja która storzy obiekt game będący isntacją klasy Game---- */ /*---- zostanie także urruchomiona metoda initializeGame ----*/ window.onload = function() {
    const game = new Game();
    // console.log(game);
    game.initializeGame();
};

},{"./Cell.js":"6LeRy","./UI.js":"6gLKF","./Counter.js":"ektkT","./Timer.js":"2FHLW","./ResetButton.js":"7hgsC","./Modal.js":"6HSk7"}],"6LeRy":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/* Każdy index naszej tablicy Cells składa się z tablic a każda tablica z 8 obiektów.  */ // obiekt będący instacją tej klasy push do naszej tablicy cells
parcelHelpers.export(exports, "Cell", ()=>Cell
);
var _uiJs = require("./UI.js");
class Cell extends _uiJs.UI {
    constructor(x, y){
        super();
        this.x = x;
        this.y = y;
        this.value = 0;
        this.isMine = false;
        this.isReveal = false;
        this.isFlagged = false;
        // dataset (własne atrybuty zaczynają  się od słowa data
        /*- [data-x="${this.x}"] to atrybut którego [w nowym obiekcie neww Cell będącym instacją tej klasy]  wartością jest numer [columna] który został przisany  w pętli for -*/ this.selector = `[data-x="${this.x}"][data-y="${this.y}"]`;
        this.element = null;
    }
    /* -- Metoda która do zmiennej przypisje nam diva z kalsami i atrybutami po których chwytamy i zwraca go  --*/ createElement() {
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

},{"./UI.js":"6gLKF","@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"6gLKF":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
/* chcemy wyrenderować nasze komórki użytkownikowi wewnątrz <article> */ // chcemy złapać nasz <article>
parcelHelpers.export(exports, "UI", ()=>UI
);
class UI {
    // obiekt w którym chcemy trzymać wszystkie nasze selektory
    UiSelectors = {
        // wyszukujemy po atrybucie data(zapisujemy w stringu)
        board: '[data-board]',
        cell: '[data-cell]',
        counter: '[data-counter]',
        timer: '[data-timer]',
        resetButton: '[data-button-reset]',
        easyButton: '[data-button-easy]',
        normalButton: '[data-button-normal]',
        expertButton: '[data-button-expert]',
        modal: '[data-modal]',
        modalHeader: '[data-modal-header]',
        modalButton: '[data-modal-button]'
    };
    getElement(selector) {
        return document.querySelector(selector);
    }
    getElements(selector) {
        return document.querySelectorAll(selector);
    }
}

},{"@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"367CR":[function(require,module,exports) {
exports.interopDefault = function(a) {
    return a && a.__esModule ? a : {
        default: a
    };
};
exports.defineInteropFlag = function(a) {
    Object.defineProperty(a, '__esModule', {
        value: true
    });
};
exports.exportAll = function(source, dest) {
    Object.keys(source).forEach(function(key) {
        if (key === 'default' || key === '__esModule') return;
        // Skip duplicate re-exports when they have the same value.
        if (key in dest && dest[key] === source[key]) return;
        Object.defineProperty(dest, key, {
            enumerable: true,
            get: function() {
                return source[key];
            }
        });
    });
    return dest;
};
exports.export = function(dest, destName, get) {
    Object.defineProperty(dest, destName, {
        enumerable: true,
        get: get
    });
};

},{}],"ektkT":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Counter", ()=>Counter
);
var _uiJs = require("./UI.js");
class Counter extends _uiJs.UI {
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

},{"./UI.js":"6gLKF","@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"2FHLW":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Timer", ()=>Timer
);
var _uiJs = require("./UI.js");
class Timer extends _uiJs.UI {
    #elemetn = null;
    #interval = null;
    numberOfSeconds = 0;
    maxNumberOfSeconds = 999;
    // przypisujemy do this.#elemetn nasz element o atrybucie [data-timer] z clasy UI
    init() {
        this.#elemetn = this.getElement(this.UiSelectors.timer);
    }
    // odpalamy naszą funkcje updateTimer co jedną sekunde
     #startTimer() {
        this.#interval = setInterval(()=>this.#updateTimer()
        , 1000);
    }
    // żeby użyć clearInterval musimy przypisać do zmiennej nasz setInterval i podać go jako parametr w clearInterval
    stopTimer() {
        clearInterval(this.#interval);
    }
    resetTimer() {
        this.numberOfSeconds = 0;
        this.#setTimerValue(this.numberOfSeconds);
        this.stopTimer();
        this.#startTimer();
    }
    // funkcja dodaje nam do #numberOfSecond jeden oraz wywołuje funkcje setTimerValue argumentem this.#numberOfSecoond
     #updateTimer() {
        this.numberOfSeconds++;
        this.numberOfSeconds <= this.maxNumberOfSeconds ? this.#setTimerValue(this.numberOfSeconds) : this.stopTimer();
    }
    // funkcja przypisuje do chwyconego elementu value jakie podamy wy argumencie
    // właśnie to chcemy wyświetlić e naszym oknie
    // co sekunde będzie do naszego elementu wkładane value
     #setTimerValue(value) {
        this.#elemetn.textContent = value;
    }
}

},{"./UI.js":"6gLKF","@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"7hgsC":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "ResetButton", ()=>ResetButton
);
var _uiJs = require("./UI.js");
class ResetButton extends _uiJs.UI {
    element = this.getElement(this.UiSelectors.resetButton);
    // zmieniamy obrazek z minaką
    changeEmotion(emotion) {
        // mamy wybrany nasz button
        // wewnątrz naszego buttona chcemy wybrać element use
        // i będziemly chcieli zmieniać atrybut href(naszą minkę)
        // metoda setAttribute ustawia nową wartość dla atrybutu
        this.element.querySelector('use').setAttribute('href', `/src/assets/sprite.svg#${emotion}`);
    }
}

},{"./UI.js":"6gLKF","@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}],"6HSk7":[function(require,module,exports) {
var parcelHelpers = require("@parcel/transformer-js/src/esmodule-helpers.js");
parcelHelpers.defineInteropFlag(exports);
parcelHelpers.export(exports, "Modal", ()=>Modal
);
var _uiJs = require("./UI.js");
class Modal extends _uiJs.UI {
    buttonText = '';
    infoText = '';
    element = this.getElement(this.UiSelectors.modal);
    button = this.getElement(this.UiSelectors.modalButton);
    header = this.getElement(this.UiSelectors.modalHeader);
    toggleModal = ()=>{
        this.element.classList.toggle('hide');
    };
    setText() {
        this.header.textContent = this.infoText;
        this.button.textContent = this.buttonText;
    }
}

},{"./UI.js":"6gLKF","@parcel/transformer-js/src/esmodule-helpers.js":"367CR"}]},["Qx6MO","4GXql"], "4GXql", "parcelRequiree590")

//# sourceMappingURL=index.333afacc.js.map
