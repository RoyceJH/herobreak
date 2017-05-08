import * as Util from './util.js';

class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
  }

  start() {
    Util.bindKeyHandlers(this.game);
    // this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this));
  }

  animate() {
    this.game.step();
    this.game.draw(this.ctx);
    requestAnimationFrame(this.animate.bind(this));
  }
}

export default GameView;
