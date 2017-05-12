class Pointer {
  constructor() {
    this.pos = [250, 620];
    this.setImage();
    this.imageAngle = 0;
  }

  position() {
    return [this.pos[0] - 15, this.pos[1]];
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
