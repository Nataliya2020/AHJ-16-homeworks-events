export default class ControllerGame {
  constructor(gamePlay, userProgress) {
    this.gamePlay = gamePlay;
    this.userProgress = userProgress;
    this.buttonStart = null;
  }

  showButtonStart() {
    this.buttonStart = document.createElement('button');
    this.buttonStart.classList.add('button');
    this.buttonStart.value = 'Start';
    this.buttonStart.textContent = 'New Game';
    const body = document.querySelector('body');

    body.appendChild(this.buttonStart);
  }
}
