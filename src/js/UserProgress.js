export default class UserProgress {
  constructor(gamePlay) {
    this.gamePlay = gamePlay;
    this.usersBonus = 0;
    this.usersMistakes = 0;
    this.containerResult = null;
    this.containerResultBonus = null;
    this.containerResultMistake = null;
  }

  addMistake() {
    this.usersMistakes += 1;
  }

  addBonus() {
    this.usersBonus += 1;
  }

  showResult() {
    this.containerResult = document.createElement('div');
    this.containerResultBonus = document.createElement('div');
    this.containerResultMistake = document.createElement('div');
    this.containerResult.classList.add('container-result');
    this.containerResultBonus.classList.add('result-bonus');
    this.containerResultMistake.classList.add('result-mistake');

    this.containerResultBonus.textContent = `Попаданий:  ${this.usersBonus}`;
    this.containerResultMistake.textContent = `Промахов:  ${this.usersMistakes}`;

    this.containerResult.appendChild(this.containerResultBonus);
    this.containerResult.appendChild(this.containerResultMistake);

    const body = document.querySelector('body');

    body.appendChild(this.containerResult);
  }
}
