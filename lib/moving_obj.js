class MovingObject {
  constructor(options) {
    this.pos = options.pos;
    this.vel = options.vel || [0,0];
    this.game = options.game;
    this.side = options.side;
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
    ctx.lineWidth = -1;
    ctx.fill();
    ctx.stroke();
  }

  move(timeDelta) {
    const velocityScale = timeDelta / this.NORMAL_TIME;
    this.pos = [this.pos[0] + this.vel[0] * velocityScale, this.pos[1] + this.vel[1] * velocityScale];

    if(this.game.attackOver(this.pos)) {
      this.remove();
    }
  }

  remove() {
    this.game.remove(this);
  }
}

export default MovingObject;
