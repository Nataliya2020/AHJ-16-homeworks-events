import GamePlay from './GamePlay';
import GameController from './GameController';

const gamePlay = new GamePlay(4);
gamePlay.bindToDOM(document.querySelector('.game-container'));

const gameControl = new GameController(gamePlay);
gameControl.init();
