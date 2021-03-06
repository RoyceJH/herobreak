import Breaker from './breaker.js';
import Board from './board.js';
import LifeBar from './life_bar.js';
import Pointer from './pointer.js';
import GoldHandler from './gold_handler.js';
import Leader from './leader.js';
import * as Util from './util.js';

class Game {
  constructor() {
    this.breakers = [];
    this.currentAttackers = [];
    this.board = new Board(this);
    this.startPos = Game.RESTPOS;
    this.DIM_X = 480;
    this.DIM_Y = 700;
    this.lifeBar = new LifeBar();
    this.pointer = new Pointer(this.board);
    this.goldHandler = new GoldHandler();
    this.turnInProgress = 0;
    this.initialSetup();
    this.breakerCost = Game.BREAKERCOST;
  }

  initialSetup() {
    this.background = new Image();
    this.background.src = 'assets/bg.png';
    this.buyBreaker = this.buyBreaker.bind(this);
    this.upgrade = this.upgrade.bind(this);
    this.addBreaker();
    this.addBreaker();
    this.addBreaker();
    this.board.addRow(1);
    this.board.addRow(1);
    this.board.addRow(1);
    this.bindButtons();
    this.resetBreakerCost();
  }

  bindButtons() {
    $('.buy-breaker-button').on('click', this.buyBreaker);
    $('.buy-upgrade-button').on('click', this.upgrade);
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
    this.updateBreakerCount();
  }

  updateBreakerCount() {
    $('.breaker-counter').text(`Breaker count: ${this.breakers.length}`);
  }

  resetBreakerCost() {
    $('.cost-upgrade').text(`Cost: ${Game.BREAKERCOST}`);
    $('.cost-breaker').text(`Cost: 10000`);
  }

  addGold(goldEarned) {
    this.goldHandler.addGold(goldEarned);
  }

  buyBreaker() {
    if(this.goldHandler.buy(this.breakerCost)) {
      this.addBreaker();
      this.breakerCost += 1000;
      $('.cost-upgrade').text(`Cost: ${this.breakerCost}`);
    }
  }

  upgradeDamage() {
    this.breakers.forEach((breaker) => {
      breaker.upgrade(15);
      $('.breaker-attack').text(`Attack: ${breaker.att}`);
    });
  }

  upgrade() {
    let cost = this.breakers[0].upgradeCost();
    if(this.goldHandler.buy(cost)){
      this.upgradeDamage();
      $('.cost-breaker').text(`Cost: ${this.breakers[0].upgradeCost()}`);
    }
  }

  allObjects() {
    let leaders = [];
    if(!this.turnInProgress) {
      leaders = this.pointer.leaders;
    }
    return [].concat(this.board.allMonsters(), this.currentAttackers, this.lifeBar, this.pointer, leaders);
  }

  clear(ctx) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    ctx.globalAlpha = 0.5;
    ctx.drawImage(this.background, 0, 0, this.DIM_Y, this.DIM_Y);
    ctx.globalAlpha = 1;
  }

  draw(ctx) {
    this.clear(ctx);
    this.allObjects().forEach((obj) => {
      obj.draw(ctx);
    });
  }

  moveObjects(delta) {
    let count = 0;
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
      if(breaker.pos[0] + 3 < 0) {
        hitLeft = true;
      }

      if(breaker.pos[0] > this.DIM_X - Util.defaults.breakerSide - 3) {
        hitRight = true;
      }

      if(breaker.pos[1] + 3 < 0) {
        hitTop = true;
      }

      breaker.updateVel(hitBot, hitTop, hitRight, hitLeft);
      hitBot = hitTop = hitRight = hitLeft = false;
      this.board.updateMons(this.gold);
    });
  }

  attackOver(pos) {
    return pos[1] > 700;
  }

  runTurn() {
    this.turnInProgress = 1;
    Object.assign(this.currentAttackers, this.breakers);
    let vel = this.pointer.calculateDir();
    let startPos = this.pointer.position();
    startPos[0] -= 5;
    let interval = 0;
    this.currentAttackers.forEach(breaker => {
      setTimeout(() => {
        breaker.assignDir(Object.assign([], vel));
        breaker.assignPos(Object.assign([], startPos));
      }, interval);
      interval += 200;
    });
  }

  takeDamage(row) {
    row.forEach(mons => {
      this.lifeBar.loseLife(mons.currHp / 10);
    });
  }

  turnOver() {
    this.turnInProgress = 0;
    this.board.addRow();
    this.board.takeDamage();
    Util.bindKeyHandlers(this);
    this.resetBreakers();
    this.pointer.reset();
    this.pointer.randomPos();
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

  over() {
    return this.lifeBar.currLife <= 0;
  }

  gameOver(ctx) {
    ctx.fillStyle = 'rgb(70, 51, 31)';
    ctx.beginPath();
    ctx.font = '30px Russo One';
    ctx.fillText("GAME OVER", 160, 200);
    ctx.fillText(`Level: ${this.board.level}`, 185, 250);
    ctx.stroke();
    $('.restart-button').css({'left':'31%', 'top': '43%'});
  }
}

Game.RESTPOS = [-100, -100];
Game.RESTVEL = [0, 0];
Game.BREAKERCOST = 1000;

export default Game;
