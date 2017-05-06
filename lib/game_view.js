class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
  }

  bindKeyHandlers() {
    document.addEventListener('keydown', (e) => {
      if(e.keyCode == '32') {
        this.game.runTurn();
      }
    });
  }

  start() {
    this.bindKeyHandlers();
    this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    const timeDelta = time - this.lastTime;
    this.game.step(timeDelta);
    this.game.draw(this.ctx);
    requestAnimationFrame(this.animate.bind(this));
  }
}

export default GameView;
