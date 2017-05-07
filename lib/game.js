import Breaker from './breaker.js';
import Board from './board.js';
import LifeBar from './life_bar.js';
import * as Util from './util.js';

class Game {
  constructor() {
    this.breakers = [];
    this.currentAttackers = [];
    this.board = new Board(this);
    this.startPos = [240, 600];
    this.DIM_X = 480;
    this.DIM_Y = 700;
    this.addBreaker();
    this.lifeBar = new LifeBar();
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
    return [].concat(this.board.allMonsters(), this.currentAttackers);
  }

  draw(ctx) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    this.allObjects().forEach((obj) => {
      obj.draw(ctx);
    });
  }

  moveObjects(delta) {
    this.currentAttackers.forEach( breaker => {
      breaker.move(delta);
    });
  }

  step(delta) {
    this.moveObjects(delta);
    this.checkCollisions();
  }

  checkCollisions() {
    this.currentAttackers.forEach(breaker => {
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
    Util.unBindKeyHandlers(this);

    Object.assign(this.currentAttackers, this.breakers);
    let vel = [-2,-2];
    let startPos = [240, 599];
    let interval = 0;
    this.currentAttackers.forEach(breaker => {
      setTimeout(() => {
        breaker.assignDir(Object.assign([], vel));
        breaker.assignPos(Object.assign([], startPos));
      }, interval);
      interval += 200;
    });
  }

  turnOver() {
    this.board.addRow();
    Util.bindKeyHandlers(this);
    this.resetBreakers();
  }

  resetBreakers() {
    this.breakers.forEach(breaker => {
      breaker.assignPos(Game.RESTPOS);
      breaker.assignDir(Game.RESTVEL);
    });
  }

  remove(object) {
    if(object instanceof Breaker) {
      this.currentAttackers.splice(this.currentAttackers.indexOf(object), 1);
    }

    if(this.currentAttackers.length === 0) {
      this.turnOver();
    }
  }
}

Game.RESTPOS = [240, 600];
Game.RESTVEL = [0, 0];

export default Game;
