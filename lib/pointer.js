class Pointer {
  constructor() {
    this.pos = [240, 600];
  }

  randomPos() {
    this.pos = Math.floor(Math.random() * (450 - 30)) + 30;
  }

  draw(ctx) {
    let image = new Image();
  }
}

export default Pointer;
