import Leader from './leader.js';
import { defaults } from './util.js';

class Pointer {
  constructor(board) {
    this.pos = [250, 620];
    this.setImage();
    this.imageAngle = 0;
    this.leaders = [];
    this.addLeaders();
    this.board = board;
  }

  addLeaders() {
    for (let i = 0; i < 10; i++) {
      this.leaders.push(new Leader({
        pos: this.pos,
        color: 'rgba(212, 212, 212, 0.7)',
        side: defaults.breakerSide / 3,
        game: this,
        board: this.board,
      }));
    }
  }

  setLeaders() {
    let pos = this.position();
    let dir = this.calculateDir();
    pos[0] += 5;
    this.leaders.forEach((leader, idx) => {
      leader.assignPos(
        [pos[0] + ((idx + 1.5) * 30 * dir[0]),
        pos[1] + ((idx + 1.5) * 30 * dir[1])]
      );
    });
  }

  position() {
    return [this.pos[0] - 9, this.pos[1]];
  }

  setAngle(pos) {
    let theta = Math.atan2(pos[0] - this.pos[0], this.pos[1] - pos[1]);
    this.rotate(theta * 180/Math.PI);
  }

  setImage() {
    this.image = new Image();
    this.image.src = 'assets/sprites/pointer.png';
  }

  randomPos() {
    this.pos[0] = Math.floor(Math.random() * (450 - 30)) + 30;
    this.setLeaders();
  }

  rotate(val) {
    if(Math.abs(val) > 80) {
      switch(val > 0) {
        case true:
          this.imageAngle = 80;
          return;
        case false:
          this.imageAngle = -80;
          return;
      }
    } else {
      this.imageAngle = val;
    }
    // setTimeout(this.setLeaders.bind(this), 10);
    this.setLeaders();
  }

  angleDir() {
    return this.imageAngle > 0 ? 1 : -1;
  }

  calculateDir() {
    let radians = Math.PI / 180 * Math.abs(this.imageAngle);
    let x = this.angleDir() * Math.sin(radians);
    let y = -Math.cos(radians);
    return [x, y];
  }

  reset() {
    this.imageAngle = 0;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.pos[0], this.pos[1]);
    ctx.rotate(this.imageAngle * TO_RADIANS);
    ctx.drawImage(this.image, -(this.image.width / 2), -(this.image.height / 2));
    ctx.restore();
  }
}

const TO_RADIANS = Math.PI / 180;

export default Pointer;
