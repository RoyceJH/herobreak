class Pointer {
  constructor() {
    this.pos = [250, 620];
    this.setImage();
    this.imageAngle = 0;
  }

  position() {
    return [this.pos[0] - 15, this.pos[1]];
  }

  setImage() {
    this.image = new Image();
    this.image.src = 'assets/sprites/pointer.png';
  }

  randomPos() {
    this.pos[0] = Math.floor(Math.random() * (450 - 30)) + 30;
  }

  rotate(val) {
    Math.abs(this.imageAngle + val) < 80 ? this.imageAngle += val : this.imageAngle;
  }

  angleDir() {
    return this.imageAngle > 0 ? 1 : -1;
  }

  calculateDir() {
    let radians = Math.PI / 180 * Math.abs(this.imageAngle);
    let x = this.angleDir() * Math.sin(radians);
    let y = -Math.cos(radians);
    return [x * 3, y * 3];
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
