class Breaker {
  constructor(options) {
    this.att = options.att;
    this.pos = options.pos;
    this.vel = options.vel || [0, 0];
    this.color = options.color;
    this.game = options.game;
    this.side = options.side;
    this.skill = options.skill;
  }

  upgradeCost() {
    return this.att * 100;
  }

  assignDir(vel) {
    this.vel = vel;
  }

  assignPos(pos) {
    this.pos = pos;
  }

  updateVel(bot, top, right, left) {
    if(bot) {
      this.vel[1] *= -1;
    }

    if(top) {
      this.vel[1] *= -1;
    }

    if(right) {
      this.vel[0] *= -1;
    }

    if(left) {
      this.vel[0] *= -1;
    }
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.pos[0] + this.side / 2, this.pos[1] + this.side / 2, this.side / 2, 0, 2 * Math.PI);
    ctx.fill();
    ctx.stroke();
  }

  upgrade(pow) {
    this.att += pow;
  }

  move(multiplier = 1) {
    this.pos = [this.pos[0] + this.vel[0] * 2.5 * multiplier, this.pos[1] + this.vel[1] * 2.5 * multiplier];

    if(this.game.attackOver(this.pos)) {
      this.remove();
    }
  }

  remove() {
    this.game.remove(this);
  }
}

export default Breaker;
