const boardTemplate = ((gamePlay, progress, contrlGame) => {
  const gamePl = gamePlay;
  const userProgress = progress;
  const ctrlGame = contrlGame;

  const gameContainer = gamePlay.container;

  let cell;

  for (let i = 0; i < gamePl.boardSize * gamePl.boardSize; i += 1) {
    cell = document.createElement('div');
    cell.classList.add('cell');
    cell.addEventListener('mouseenter', (event) => gamePl.onCellEnter(event));
    cell.addEventListener('click', (event) => gamePl.onCellClick(event));

    gameContainer.appendChild(cell);
  }

  gamePl.cells = [...gameContainer.children];

  userProgress.showResult();
  ctrlGame.showButtonStart();

  const body = document.querySelector('body');
  gamePl.newGame = body.querySelector('button');

  function newGame(event) {
    clearInterval(ctrlGame.interval);
    gamePl.container = document.querySelector('.game-container');
    gamePl.container.classList.remove('hammer-hover');
    gamePl.cells = [...document.querySelectorAll('.cell')];

    for (const item of gamePl.cells) {
      item.remove();
    }

    document.querySelector('.button').remove();
    document.querySelector('.container-result').remove();
    gamePl.onNewGameClick(event);
  }

  gamePl.newGame.addEventListener('click', newGame);
});

export default boardTemplate;
