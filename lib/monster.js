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

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.rect(this.pos[0], this.pos[1], this.side, this.side);

    if(this.special === 0) {
      ctx.fillText(
        this.currHp,
        this.pos[0] + this.side / 3.5,
        this.pos[1] + this.side / 3.5
      );
    } else if(this.special === 1) {
      ctx.fill();
    }
    ctx.stroke();
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

    if((this.yRange()[1] < breakPos[1]) && (this.yRange()[1] > breakPos[1] - 2)){
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
    if( (this.yRange()[0] > breakPos[1] + Util.defaults.breakerSide) && (this.yRange()[0] < breakPos[1] + 2 + Util.defaults.breakerSide ) ) {
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
    if( (this.xRange()[1] < breakPos[0]) && (this.xRange()[1] > breakPos[0] - 5)) {
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
    if( (this.xRange()[0] > breakPos[0] + Util.defaults.breakerSide) && (this.xRange()[0] < breakPos[0] + 2 + Util.defaults.breakerSide)) {
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
