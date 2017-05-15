import * as Util from './util.js';

class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
  }

  start() {
    Util.bindKeyHandlers(this.game);
    this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this));
  }

  animate(time) {
    if(this.game.over()) {
      this.end();
    } else {
      const timeDelta = time - this.lastTime;
      this.game.step(timeDelta);
      this.game.draw(this.ctx);
      this.lastTime = time;
      requestAnimationFrame(this.animate.bind(this));
    }
  }

  end() {
    this.game.clear(this.ctx);
    this.game.gameOver(this.ctx);
  }

}

export default GameView;
