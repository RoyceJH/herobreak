import Breaker from './breaker.js';
import Board from './board.js';
import * as Util from './util.js';

class Game {
  constructor() {
    this.breakers = [];
    this.attackers = [];
    this.board = new Board();
    this.startPos = [240, 600];
    this.DIM_X = 480;
    this.DIM_Y = 700;
    this.addBreaker();
  }

  addBreaker() {
    const breaker = new Breaker({
      att: 40,
      pos: this.startPos,
      color: '#cb1414',
      side: Util.defaults.breakerSide,
      skill: [],
      game: this,
    });

    this.breakers.push(breaker);
  }

  allObjects() {
    return [].concat(this.board.allMonsters(), this.breakers);
  }

  draw(ctx) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    this.allObjects().forEach((obj) => {
      obj.draw(ctx);
    });
  }

  moveObjects(delta) {
    this.attackers.forEach( breaker => {
      breaker.move(delta);
    });
  }

  step(delta) {
    this.moveObjects(delta);
    this.checkCollisions();
  }

  checkCollisions() {
    this.attackers.forEach(breaker => {
      let hitBot = false;
      let hitTop = false;
      let hitRight = false;
      let hitLeft = false;

      this.board.allMonsters().forEach(mons => {
          if((breaker.vel[1] < 0) && mons.collidedBottom(breaker)) {
            hitBot = true;
            mons.takeHit(breaker.att);
          }

          if((breaker.vel[1] > 0) && mons.collidedTop(breaker)) {
            hitTop = true;
            mons.takeHit(breaker.att);
          }

          if((breaker.vel[0] < 0 && mons.collidedRight(breaker))) {
            hitRight = true;
            mons.takeHit(breaker.att);
          }

          if((breaker.vel[0] > 0 && mons.collidedLeft(breaker))) {
            hitLeft = true;
            mons.takeHit(breaker.att);
          }
      });

      //collision canvas
      if(breaker.pos[0] < 0) {
        hitLeft = true;
      }

      if(breaker.pos[0] > this.DIM_X - Util.defaults.breakerSide) {
        hitRight = true;
      }

      if(breaker.pos[1] < 0) {
        hitTop = true;
      }

      breaker.updateVel(hitBot, hitTop, hitRight, hitLeft);
      hitBot = hitTop = hitRight = hitLeft = false;
      this.board.updateMons();
    });
  }

  attackOver(pos) {
    return pos[1] > 700;
  }

  runTurn() {
    Object.assign(this.attackers, this.breakers);
    this.attackers.forEach(breaker => {
      breaker.assignDir([-1,-1]);
      breaker.assignPos([240, 599]);
    });
    this.board.addRow();
  }

  remove(object) {
    if(object instanceof Breaker) {
      this.attackers.splice(this.attackers.indexOf(object), 1);
    }
  }


}


export default Game;
