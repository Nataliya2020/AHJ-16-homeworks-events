export default function getCells() {
  let cells = document.querySelectorAll('.cell');

  cells = [...cells];
  return cells;
}

export function getIndexCells() {
  const positions = getCells();

  const positionIndex = [];

  positions.forEach((item, index) => {
    positionIndex.push(index);
  });

  return positionIndex;
}

export function getPos() {
  return getIndexCells()[Math.floor(Math.random() * getCells().length)];
}
