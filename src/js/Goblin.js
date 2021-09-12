import { getPos } from './getPos';

export default class Goblin {
  constructor(type = 'goblin') {
    this.type = type;
    this.position = getPos();
  }
}
