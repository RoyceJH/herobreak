/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const defaults = ({
  side: 80,
  breakerSide: 80 / 2.7,
  speed: 4,
});
/* harmony export (immutable) */ __webpack_exports__["b"] = defaults;


const randomColor = () => {
  const hexDigits = '0123456789ABCDEF';

  let color = "#";
  for (let i = 0; i < 3; i++) {
    color += hexDigits[Math.floor(Math.random() * 16)];
  }

  return color;
};
/* harmony export (immutable) */ __webpack_exports__["c"] = randomColor;


const inBounds = (range, val) => {
  return (range[0] < val && range[1] > val);
};
/* harmony export (immutable) */ __webpack_exports__["d"] = inBounds;


const keyBinds = (game) => {
  return (e) => {
      e.preventDefault();
      game.runTurn();
      unBindKeyHandlers(game);
  };
};
/* unused harmony export keyBinds */


const angleBind = (game) => {
  return (e) => {
    game.pointer.setAngle([e.offsetX, e.offsetY]);
  };
};
/* unused harmony export angleBind */


const bindKeyHandlers = (game) => {
  $('#canvas').on('mousedown', keyBinds(game));
  $('#canvas').on('mousemove', angleBind(game));
};
/* harmony export (immutable) */ __webpack_exports__["a"] = bindKeyHandlers;


const unBindKeyHandlers = (game) => {
  $('#canvas').off('mousedown');
};
/* unused harmony export unBindKeyHandlers */



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__moving_obj_js__ = __webpack_require__(3);


class Leader extends __WEBPACK_IMPORTED_MODULE_0__moving_obj_js__["a" /* default */] {
  constructor(options) {
    super(options);
    this.color = options.color;
    this.NORMAL_TIME = 1000 / 2000;
    this.board = options.board;
  }

}

/* harmony default export */ __webpack_exports__["a"] = (Leader);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_js__ = __webpack_require__(0);


class Monster {
  constructor(hp, pos) {
    this.totalHp = hp;
    this.currHp = hp;
    this.pos = pos;
    this.side = __WEBPACK_IMPORTED_MODULE_0__util_js__["b" /* defaults */].side;
    this.color = __WEBPACK_IMPORTED_MODULE_0__util_js__["c" /* randomColor */]();
    this.randomImage();
  }

  randomImage() {
    this.image = new Image();
    let imageNum = Math.floor(Math.random() * 4) + 1;
    this.image.src = `assets/sprites/monsters/type${imageNum}.png`;
  }

  moveDown() {
    this.pos[1] += __WEBPACK_IMPORTED_MODULE_0__util_js__["b" /* defaults */].side;
  }

  drawBg(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.rect(this.pos[0], this.pos[1], this.side, this.side);
    ctx.fill();
    ctx.stroke();
  }

  drawHp(ctx) {
    ctx.fillStyle = 'rgb(255, 255, 255)';
    ctx.beginPath();
    let textX;
    let textY = this.pos[1] + this.side / 1.7;

    switch(true) {
      case(this.currHp > 999):
        textX = this.pos[0] + this.side / 4.7;
        break;
      case(this.currHp > 99):
        textX = this.pos[0] + this.side / 3.5;
        break;
      case(this.currHp > 9):
        textX = this.pos[0] + this.side / 2.7;
        break;
      default:
        textX = this.pos[0] + this.side / 2.2;
        break;
    }

    ctx.fillText(
      this.currHp,
      textX,
      textY
    );
    ctx.stroke();
  }

  draw(ctx) {
    this.drawBg(ctx);
    this.drawHp(ctx);
  }

  xRange(side) {
    const leftBound = this.pos[0] + 4;
    const rightBound = this.pos[0] + side + 4;
    return [leftBound, rightBound];
  }

  yRange(side) {
    const topBound = this.pos[1] + 4;
    const bottomBound = this.pos[1]+ side + 4;
    return [topBound, bottomBound];
  }

  takeHit(att) {
    this.currHp -= att;
  }

  collidedBottom(breaker) {
    let breakPos = breaker.pos;
    let side = this.side;

    if( (this.yRange(side)[1] < breakPos[1] + 5) && (this.yRange(side)[1] > breakPos[1] - 7) ) {
      let breakerLeft = breakPos[0];
      let breakerRight = breakPos[0] + __WEBPACK_IMPORTED_MODULE_0__util_js__["b" /* defaults */].breakerSide;

      if(__WEBPACK_IMPORTED_MODULE_0__util_js__["d" /* inBounds */](this.xRange(side), breakerLeft) || __WEBPACK_IMPORTED_MODULE_0__util_js__["d" /* inBounds */](this.xRange(side), breakerRight)) {
        return true;
      }
    }
    return false;
  }

  collidedTop(breaker) {
    let breakPos = breaker.pos;
    let side = this.side;

    if( (this.yRange(side)[0] > breakPos[1] + __WEBPACK_IMPORTED_MODULE_0__util_js__["b" /* defaults */].breakerSide - 5) && (this.yRange(side)[0] < breakPos[1] + 7 + __WEBPACK_IMPORTED_MODULE_0__util_js__["b" /* defaults */].breakerSide ) ) {
      let breakerLeft = breakPos[0];
      let breakerRight = breakPos[0] + __WEBPACK_IMPORTED_MODULE_0__util_js__["b" /* defaults */].breakerSide;

      if(__WEBPACK_IMPORTED_MODULE_0__util_js__["d" /* inBounds */](this.xRange(side), breakerLeft) || __WEBPACK_IMPORTED_MODULE_0__util_js__["d" /* inBounds */](this.xRange(side),breakerRight)) {
        return true;
      }
    }
    return false;
  }

  collidedRight(breaker) {
    let breakPos = breaker.pos;
    let side = this.side;

    if( (this.xRange(side)[1] < breakPos[0] + 5) && (this.xRange(side)[1] > breakPos[0] - 7)) {
      let breakerTop = breakPos[1];
      let breakerBot = breakPos[1] + __WEBPACK_IMPORTED_MODULE_0__util_js__["b" /* defaults */].breakerSide;

      if(__WEBPACK_IMPORTED_MODULE_0__util_js__["d" /* inBounds */](this.yRange(side), breakerTop) || __WEBPACK_IMPORTED_MODULE_0__util_js__["d" /* inBounds */](this.yRange(side), breakerBot)) {
        return true;
      }
    }
    return false;
  }

  collidedLeft(breaker) {
    let breakPos = breaker.pos;
    let side = this.side;

    if( (this.xRange(side)[0] > breakPos[0] + __WEBPACK_IMPORTED_MODULE_0__util_js__["b" /* defaults */].breakerSide - 5) && (this.xRange(side)[0] < breakPos[0] + 7 + __WEBPACK_IMPORTED_MODULE_0__util_js__["b" /* defaults */].breakerSide)) {
      let breakerTop = breakPos[1];
      let breakerBot = breakPos[1] + __WEBPACK_IMPORTED_MODULE_0__util_js__["b" /* defaults */].breakerSide;

      if(__WEBPACK_IMPORTED_MODULE_0__util_js__["d" /* inBounds */](this.yRange(side), breakerTop) || __WEBPACK_IMPORTED_MODULE_0__util_js__["d" /* inBounds */](this.yRange(side), breakerBot)) {
        return true;
      }
    }
    return false;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Monster);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class MovingObject {
  constructor(options) {
    this.pos = options.pos;
    this.vel = options.vel || [0,0];
    this.game = options.game;
    this.side = options.side;
  }

  assignDir(vel) {
    this.vel = vel;
  }

  assignPos(pos) {
    this.pos = pos;
  }

  updateVel(bot, top, right, left) {
    if(bot) {
      this.vel[1] *= -1;
    }

    if(top) {
      this.vel[1] *= -1;
    }

    if(right) {
      this.vel[0] *= -1;
    }

    if(left) {
      this.vel[0] *= -1;
    }
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.pos[0] + this.side / 2, this.pos[1] + this.side / 2, this.side / 2, 0, 2 * Math.PI);
    ctx.lineWidth = -1;
    ctx.fill();
    ctx.stroke();
  }

  move(timeDelta) {
    const velocityScale = timeDelta / this.NORMAL_TIME;
    this.pos = [this.pos[0] + this.vel[0] * velocityScale, this.pos[1] + this.vel[1] * velocityScale];

    if(this.game.attackOver(this.pos)) {
      this.remove();
    }
  }

  remove() {
    this.game.remove(this);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (MovingObject);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__breaker_js__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__board_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__life_bar_js__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pointer_js__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__gold_handler_js__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__leader_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__util_js__ = __webpack_require__(0);








class Game {
  constructor() {
    this.breakers = [];
    this.currentAttackers = [];
    this.board = new __WEBPACK_IMPORTED_MODULE_1__board_js__["a" /* default */](this);
    this.startPos = Game.RESTPOS;
    this.DIM_X = 480;
    this.DIM_Y = 700;
    this.lifeBar = new __WEBPACK_IMPORTED_MODULE_2__life_bar_js__["a" /* default */]();
    this.pointer = new __WEBPACK_IMPORTED_MODULE_3__pointer_js__["a" /* default */](this.board);
    this.goldHandler = new __WEBPACK_IMPORTED_MODULE_4__gold_handler_js__["a" /* default */]();
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
    const breaker = new __WEBPACK_IMPORTED_MODULE_0__breaker_js__["a" /* default */]({
      att: 40,
      pos: this.startPos,
      color: '#cb1414',
      side: __WEBPACK_IMPORTED_MODULE_6__util_js__["b" /* defaults */].breakerSide,
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

      if(breaker.pos[0] > this.DIM_X - __WEBPACK_IMPORTED_MODULE_6__util_js__["b" /* defaults */].breakerSide - 3) {
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
    __WEBPACK_IMPORTED_MODULE_6__util_js__["a" /* bindKeyHandlers */](this);
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
    if(object instanceof __WEBPACK_IMPORTED_MODULE_0__breaker_js__["a" /* default */]) {
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

/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_js__ = __webpack_require__(0);


class GameView {
  constructor(game, ctx) {
    this.ctx = ctx;
    this.game = game;
  }

  start() {
    __WEBPACK_IMPORTED_MODULE_0__util_js__["a" /* bindKeyHandlers */](this.game);
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

/* harmony default export */ __webpack_exports__["a"] = (GameView);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__monster_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__boss_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_js__ = __webpack_require__(0);




class Board {
  constructor(game) {
    this.monsterRows = [];
    this.level = 0;
    this.game = game;
    this.max_monster_count = 6;
  }

  moveDown() {
    this.monsterRows.forEach( (row) => {
      row.forEach( (monster) => monster.moveDown());
    });
  }

  takeDamage() {
    let toRemove;
    this.monsterRows.forEach((row, idx) => {
      row.forEach((monster) => {
        if(monster.pos[1] + monster.side > 560) {
          toRemove = idx;
        }
      });
    });

    if(toRemove >= 0) {
      this.game.takeDamage(this.monsterRows[toRemove]);
      this.monsterRows.splice(toRemove, 1);
    }
  }

  assignMultiplier() {
    return Math.random() > 0.95 ? 1 : 100;
  }

  updateLevel(lvl) {
    if(lvl) {
      this.level = 1;
    } else {
      this.level += 1;
    }

    $('.level-counter').text(`Level: ${this.level}`);
  }

  addRow(lvl) {
    let pos = [0, 0];
    const newRow = [];
    this.moveDown();
    if(this.level > 5 && this.level % 15 === 0) {
      this.monsterRows.push([new __WEBPACK_IMPORTED_MODULE_1__boss_js__["a" /* default */](100 + this.level * 10)]);
    } else if(this.level % 15 === 14) {
    } else {
      this.monsterRows.push(this.spawn(this.max_monster_count, pos, newRow));
    }
    this.updateLevel(lvl);
  }

  spawn(num, pos, newRow, any = false) {
    let multiplier = this.assignMultiplier() || 2;
    let special = 0;

    if(num > 0) {
      if(Math.random() > .6) {
        newRow.push( new __WEBPACK_IMPORTED_MODULE_0__monster_js__["a" /* default */](
          (100 + this.level * 20),
          Object.assign([],pos),
          special)
        );

        any = true;
      }

      pos[0] += __WEBPACK_IMPORTED_MODULE_2__util_js__["b" /* defaults */].side;
      return this.spawn((num - 1), pos, newRow, any);
    }

    if(num === 1 && any === false) {
      newRow.push( new __WEBPACK_IMPORTED_MODULE_0__monster_js__["a" /* default */](
        (100 + this.level * multiplier),
        Object.assign([],pos),
        special)
      );
    }

    return newRow;
  }

  allMonsters() {
    let allSters = [];
    this.monsterRows.forEach((row) => {
      allSters = allSters.concat(row);
    });

    return allSters;
  }

  updateMons() {
    this.monsterRows.forEach((row) => {
      let toRemove = [];
      row.forEach((mons, idx) => {
        if(mons.currHp <= 0) {
          this.game.addGold(mons.totalHp);
          toRemove.push(idx);
        }
      });

      for(let i = toRemove.length - 1; i >= 0; i--){
        if(toRemove[i] >= 0) {
          row.splice(toRemove[i], 1);
        }
      }
    });
  }

}

const MAX_MONSTER_COUNT = 6;

/* harmony default export */ __webpack_exports__["a"] = (Board);


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__monster_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_js__ = __webpack_require__(0);



class Boss extends __WEBPACK_IMPORTED_MODULE_0__monster_js__["a" /* default */] {
  constructor(hp, pos = [__WEBPACK_IMPORTED_MODULE_1__util_js__["b" /* defaults */].side * 2, 0]) {
    super(hp * 10, pos);
    this.side = __WEBPACK_IMPORTED_MODULE_1__util_js__["b" /* defaults */].side * 2;
  }

  drawHp(ctx) {
    ctx.fillStyle = 'rgb(255, 255, 255)';
    ctx.beginPath();
    let textX;
    let textY = this.pos[1] + this.side / 1.9;

    switch(true) {
      case(this.currHp > 999):
        textX = this.pos[0] + this.side / 2.8;
        break;
      case(this.currHp > 99):
        textX = this.pos[0] + this.side / 2.5;
        break;
      case(this.currHp > 9):
        textX = this.pos[0] + this.side / 2.3;
        break;
      default:
        textX = this.pos[0] + this.side / 2;
        break;
    }

    ctx.fillText(
      this.currHp,
      textX,
      textY
    );
    ctx.stroke();
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Boss);


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_js__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__game_view_js__ = __webpack_require__(5);



document.addEventListener('DOMContentLoaded', () => {

  $('.close').click((e) => {
    $('.modal').hide();
  });

  $('.new-game').click((e) => {
    $('.restart-button').css({'left': '-1000px'});
    newGame();
  });

  const newGame = () => {
    const canvasEl = document.getElementById('canvas');
    const ctx = canvasEl.getContext('2d');

    ctx.font = '20px Arial';
    const game = new __WEBPACK_IMPORTED_MODULE_0__game_js__["a" /* default */]();
    new __WEBPACK_IMPORTED_MODULE_1__game_view_js__["a" /* default */](game, ctx).start();
  };

  newGame();
});


/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__moving_obj_js__ = __webpack_require__(3);


class Breaker extends __WEBPACK_IMPORTED_MODULE_0__moving_obj_js__["a" /* default */] {
  constructor(options) {
    super(options);
    this.att = options.att;
    this.color = options.color;
    this.skill = options.skill;
    this.NORMAL_TIME = 1000 / 525;
  }

  upgradeCost() {
    return this.att * 250;
  }

  upgrade(pow) {
    this.att += pow;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Breaker);


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class GoldHandler {
  constructor() {
    this.gold = 0;
    this.updateGold();
  }

  gold() {
    return this.gold;
  }

  updateGold() {
    $('.current-gold').text(`Gold: ${this.gold}`);
  }

  addGold(goldEarned) {
    this.gold += goldEarned;
    this.updateGold();
  }

  renderError(cost) {
    $('.buy-errors').text(`Need ${cost} gold to purchase.`);
    setTimeout(()=> {
      $('.buy-errors').text('');
    }, 2000);
  }

  buy(cost) {
    if(this.gold >= cost) {
      this.gold -= cost;
      this.updateGold();
      return true;
    } else {
      this.renderError(cost);
      return false;
    }
  }
}

/* harmony default export */ __webpack_exports__["a"] = (GoldHandler);


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class LifeBar {
  constructor() {
    this.maxLife = 1000;
    this.currLife = this.maxLife;
    this.pos = [0, 680];
  }

  addLife(boost) {
    this.currLife += boost;
  }

  loseLife(dmg) {
    this.currLife -= dmg;
  }

  drawMax(ctx) {
    ctx.fillStyle = 'rgb(255, 255, 255)';
    ctx.beginPath();
    ctx.rect(this.pos[0], this.pos[1], ctx.canvas.width, 20);
    ctx.fill();
    ctx.stroke();
  }

  drawCurr(ctx) {
    ctx.fillStyle = 'rgb(238, 218, 85)';
    ctx.beginPath();
    let percentage = this.currLife / this.maxLife;
    ctx.rect(this.pos[0], this.pos[1], Math.floor(percentage * ctx.canvas.width), 20);
    ctx.fill();
    ctx.stroke();
  }

  drawText(ctx) {
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.beginPath();
    ctx.fillText(`${this.currLife} / ${this.maxLife} `, 187, 696.5, 150);
    ctx.stroke();
  }

  draw(ctx) {
    this.drawMax(ctx);
    this.drawCurr(ctx);
    this.drawText(ctx);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (LifeBar);


/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__leader_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_js__ = __webpack_require__(0);



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
      this.leaders.push(new __WEBPACK_IMPORTED_MODULE_0__leader_js__["a" /* default */]({
        pos: this.pos,
        color: 'rgba(212, 212, 212, 0.7)',
        side: __WEBPACK_IMPORTED_MODULE_1__util_js__["b" /* defaults */].breakerSide / 3,
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

/* harmony default export */ __webpack_exports__["a"] = (Pointer);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map