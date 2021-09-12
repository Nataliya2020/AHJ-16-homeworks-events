export default class GamePlay {
  constructor(boardSize) {
    this.boardSize = boardSize;
    this.container = null;
    this.cellClickListeners = [];
    this.cellEnterListeners = [];
    this.newGameListeners = [];
    this.cells = [];
    this.moveIndex = 0;
    this.newGame = null;
    this.cell = null;
    this.message = '';
  }

  bindToDOM(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error('container is not HTMLElement');
    }

    this.container = container;
  }

  addCellEnterListener(callback) {
    this.cellEnterListeners.push(callback);
  }

  addCellClickListener(callback) {
    this.cellClickListeners.push(callback);
  }

  onCellEnter(event) {
    event.preventDefault();
    const index = this.cells.indexOf(event.currentTarget);
    this.cellEnterListeners.forEach((item) => item.call(null, index));
  }

  onCellClick(event) {
    const index = this.cells.indexOf(event.currentTarget);
    this.cellClickListeners.forEach((item) => item.call(null, index));
  }

  setCursor(cell) {
    this.cell = cell;
    this.cell.classList.remove('hammer-click');
    this.cell.classList.add('hammer-hover');
  }

  changeCursor(cell) {
    this.cell = cell;
    this.cell.classList.remove('hammer-hover');
    this.cell.classList.add('hammer-click');
  }

  cursorChangeSpeed(cell) {
    this.changeCursor(cell);
    setTimeout(() => {
      cell.classList.remove('hammer-click');
    }, 300);
  }

  showMessage(message) {
    this.message = message;
    alert(this.message);// eslint-disable-line
  }

  addNewGameListener(callback) {
    this.newGameListeners.push(callback);
  }

  onNewGameClick(event) {
    event.preventDefault();
    this.newGameListeners.forEach((item) => item.call(null));
  }
}
