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
      debugger
      this.vel[0] *= -1;
    }

    if(left) {
      debugger
      this.vel[0] *= -1;
    }
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.rect(this.pos[0], this.pos[1], this.side, this.side);
    ctx.fill();
    ctx.stroke();
  }

  upgrade(pow) {
    this.att += pow;
  }

  move(timeDelta) {
    const velocityScale = timeDelta / NORMAL_TIME_FRAME_DELTA,
      offsetX = this.vel[0] * velocityScale,
      offsetY = this.vel[1] * velocityScale;
      // debugger
    this.pos = [this.pos[0] + this.vel[0] * 2.5, this.pos[1] + this.vel[1] * 2.5];

    if(this.game.attackOver(this.pos)) {
      this.remove();
    }
  }

  remove() {
    this.game.remove(this);
  }
}

const NORMAL_TIME_FRAME_DELTA = 1000/60;

export default Breaker;
