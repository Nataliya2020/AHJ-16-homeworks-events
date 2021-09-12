import getCells from './getPos';

export default function redrawPositions(object) {
  const cells = getCells();
  for (const cell of cells) {
    cell.innerHTML = '';
  }

  const cellElem = cells[object.position];
  const charElem = document.createElement('div');
  charElem.classList.add('character', object.type);

  cellElem.appendChild(charElem);
}
