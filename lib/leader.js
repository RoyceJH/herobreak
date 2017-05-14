import MovingObject from './moving_obj.js';

class Leader extends MovingObject {
  constructor(options) {
    super(options);
    this.color = options.color;
    this.NORMAL_TIME = 1000 / 2000;
    this.board = options.board;
  }

}

export default Leader;
