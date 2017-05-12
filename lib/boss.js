import Monster from './monster.js';
import * as Util from './util.js';

class Boss extends Monster {
  constructor(hp, pos = [Util.defaults.side * 2, 0]) {
    super(hp * 10, pos);
    this.side = Util.defaults.side * 2;
  }

  drawHp(ctx) {
    ctx.fillStyle = 'rgb(255, 255, 255)';
    ctx.beginPath();
    let textX;
    let textY = this.pos[1] + this.side / 1.9;

    switch(true) {
      case(this.currHp > 999):
        textX = this.pos[0] + this.side / 2.8;
        break;
      case(this.currHp > 99):
        textX = this.pos[0] + this.side / 2.5;
        break;
      case(this.currHp > 9):
        textX = this.pos[0] + this.side / 2.3;
        break;
      default:
        textX = this.pos[0] + this.side / 2;
        break;
    }

    ctx.fillText(
      this.currHp,
      textX,
      textY
    );
    ctx.stroke();
  }
}

export default Boss;
