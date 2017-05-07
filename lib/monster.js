import * as Util from './util.js';

class Monster {
  constructor(hp, pos, special) {
    this.totalHp = hp;
    this.currHp = hp;
    this.pos = pos;
    this.side = Util.defaults.side;
    this.color = Util.randomColor();
    this.special = special;
  }

  moveDown() {
    this.pos[1] += Util.defaults.side;
  }

  drawBg(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.rect(this.pos[0], this.pos[1], this.side, this.side);
    ctx.fill();
    ctx.stroke();
  }

  drawHp(ctx) {
    ctx.fillStyle = 'rgb(255, 255, 255)';
    ctx.beginPath();
    let textX;
    let textY = this.pos[1] + this.side / 1.7;

    switch(true) {
      case(this.currHp > 999):
        textX = this.pos[0] + this.side / 4.7;
        break;
      case(this.currHp > 99):
        textX = this.pos[0] + this.side / 3.5;
        break;
      case(this.currHp > 9):
        textX = this.pos[0] + this.side / 2.7;
        break;
      default:
        textX = this.pos[0] + this.side / 2.2;
        break;
    }

    ctx.fillText(
      this.currHp,
      textX,
      textY
    );
    ctx.stroke();
  }

  draw(ctx) {
    this.drawBg(ctx);
    this.drawHp(ctx);
  }

  xRange() {
    const leftBound = this.pos[0];
    const rightBound = this.pos[0] + Util.defaults.side;
    return [leftBound, rightBound];
  }

  yRange() {
    const topBound = this.pos[1];
    const bottomBound = this.pos[1]+ Util.defaults.side;
    return [topBound, bottomBound];
  }

  takeHit(att) {
    this.currHp -= att;
  }

  collidedBottom(breaker) {
    let breakPos = breaker.pos;

    if( (this.yRange()[1] < breakPos[1]) && (this.yRange()[1] > breakPos[1] - 8) ) {
      let breakerLeft = breakPos[0];
      let breakerRight = breakPos[0] + Util.defaults.breakerSide;

      if(Util.inBounds(this.xRange(), breakerLeft) || Util.inBounds(this.xRange(), breakerRight)) {
        return true;
      }
    }
    return false;
  }

  collidedTop(breaker) {
    let breakPos = breaker.pos;
    if( (this.yRange()[0] > breakPos[1] + Util.defaults.breakerSide) && (this.yRange()[0] < breakPos[1] + 8 + Util.defaults.breakerSide ) ) {
      let breakerLeft = breakPos[0];
      let breakerRight = breakPos[0] + Util.defaults.breakerSide;

      if(Util.inBounds(this.xRange(), breakerLeft) || Util.inBounds(this.xRange(),breakerRight)) {
        return true;
      }
    }
    return false;
  }

  collidedRight(breaker) {
    let breakPos = breaker.pos;
    if( (this.xRange()[1] < breakPos[0]) && (this.xRange()[1] > breakPos[0] - 8)) {
      let breakerTop = breakPos[1];
      let breakerBot = breakPos[1] + Util.defaults.breakerSide;

      if(Util.inBounds(this.yRange(), breakerTop) || Util.inBounds(this.yRange(), breakerBot)) {
        return true;
      }
    }
    return false;
  }

  collidedLeft(breaker) {
    let breakPos = breaker.pos;
    if( (this.xRange()[0] > breakPos[0] + Util.defaults.breakerSide) && (this.xRange()[0] < breakPos[0] + 8 + Util.defaults.breakerSide)) {
      let breakerTop = breakPos[1];
      let breakerBot = breakPos[1] + Util.defaults.breakerSide;

      if(Util.inBounds(this.yRange(), breakerTop) || Util.inBounds(this.yRange(), breakerBot)) {
        return true;
      }
    }
    return false;
  }
}

export default Monster;
