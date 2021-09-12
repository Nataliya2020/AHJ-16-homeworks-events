/**
 * @jest-environment jsdom
 */

import GamePlay from '../GamePlay';

test('checking GamePlay', () => {
  function checkingGamePlay() {
    const gameplay = new GamePlay();
    gameplay.bindToDOM(null);
  }

  expect(checkingGamePlay).toThrowError(new Error('container is not HTMLElement'));
});
