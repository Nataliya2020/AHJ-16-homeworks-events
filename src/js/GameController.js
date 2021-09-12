import boardTemplate from './boardTemplate';
import Goblin from './Goblin';
import getCells from './getPos';
import UserProgress from './UserProgress';
import ControllerGame from './ControllerGame';
import redrawPosition from './redrawPosition';

export default class GameController {
  constructor(gamePlay) {
    this.gamePlay = gamePlay;
    this.userProgress = new UserProgress(this.gamePlay);
    this.controllerGame = new ControllerGame(this.gamePlay, this.userProgress);
    this.bot = null;
    this.interval = null;
    this.moveIndex = null;
  }

  init() {
    boardTemplate(this.gamePlay, this.userProgress, this.controllerGame);
    this.bot = new Goblin('goblin');
    redrawPosition(this.bot);
    this.interval = this.movePC();
    this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this));
    this.gamePlay.addCellClickListener(this.onCellClick.bind(this));
    this.gamePlay.addNewGameListener(this.startNewGame.bind(this));
    this.userProgress.usersMistakes = 0;
    this.userProgress.usersBonus = 0;
    this.userProgress.containerResultBonus.textContent = 'Попаданий:  0';
    this.userProgress.containerResultMistake.textContent = 'Промахов:  0';
  }

  startNewGame() {
    clearInterval(this.interval);
    this.gamePlay.cellClickListeners = [];
    this.gamePlay.cellEnterListeners = [];
    this.gamePlay.addCellEnterListener(this.onCellEnter.bind(this));
    this.gamePlay.addCellClickListener(this.onCellClick.bind(this));

    boardTemplate(this.gamePlay, this.userProgress, this.controllerGame);
    this.bot = null;
    this.bot = new Goblin('goblin');
    redrawPosition(this.bot);
    this.interval = null;
    this.interval = this.movePC();

    this.userProgress.usersMistakes = 0;
    this.userProgress.usersBonus = 0;
    this.userProgress.containerResultBonus.textContent = 'Попаданий:  0';
    this.userProgress.containerResultMistake.textContent = 'Промахов:  0';
  }

  onCellEnter() {
    this.gamePlay.setCursor(this.gamePlay.container);
  }

  onCellClick(index) {
    if (this.moveIndex === index) {
      const cells = getCells();
      const children = [...cells[index].children];

      for (const elem of children) {
        if (elem.classList.contains('goblin')) {
          this.gamePlay.cursorChangeSpeed(cells[index]);
          cells[index].firstChild.remove();
          const cellElem = cells[index];
          const charElem = document.createElement('div');
          cellElem.appendChild(charElem);
          this.userProgress.addBonus();
          this.userProgress.containerResultBonus.textContent = `Попаданий:  ${this.userProgress.usersBonus}`;

          if (this.userProgress.usersBonus === 10) {
            this.gamePlay.showMessage('Поздравляем, Вы выиграли');
            this.endGame();
          }
        }
      }
    } else {
      const cells = getCells();
      this.gamePlay.cursorChangeSpeed(cells[index]);
      this.userProgress.addMistake();
      this.userProgress.containerResultMistake.textContent = `Промахов:  ${this.userProgress.usersMistakes}`;

      if (this.userProgress.usersMistakes === 5) {
        this.gamePlay.showMessage('Вы проиграли');
        this.endGame();
      }
    }
  }

  movingPC() {
    const cells = getCells();
    let personIndex = null;
    cells.forEach((cell, index) => {
      const cellBoard = cell;
      if (cellBoard.children.length > 0) {
        personIndex = index;
        cellBoard.innerHTML = '';
        cellBoard.classList.remove('hammer-hover');
      }
    });

    let goblin = new Goblin('goblin');

    while (goblin.position === personIndex) {
      goblin = new Goblin('goblin');
    }

    this.moveIndex = goblin.position;

    redrawPosition(goblin);
  }

  movePC() {
    return setInterval(() => this.movingPC(), 1000);
  }

  endGame() {
    clearInterval(this.interval);
    this.gamePlay.cellClickListeners = [];
    this.gamePlay.cellEnterListeners = [];
  }
}
