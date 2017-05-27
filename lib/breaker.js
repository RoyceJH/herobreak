import MovingObject from './moving_obj.js';

class Breaker extends MovingObject {
  constructor(options) {
    super(options);
    this.att = options.att;
    this.color = options.color;
    this.skill = options.skill;
    this.NORMAL_TIME = 1000 / 525;
  }

  upgradeCost() {
    return this.att * 250;
  }

  upgrade(pow) {
    this.att += pow;
  }
}

export default Breaker;
