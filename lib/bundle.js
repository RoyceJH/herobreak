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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
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
    if(e.keyCode == '32') {
      game.runTurn();
      unBindKeyHandlers(game);
    } else if (e.keyCode == '37') {
      game.pointer.rotate(-4);
    } else if (e.keyCode == '39') {
      game.pointer.rotate(4);
    }
  };
};
/* unused harmony export keyBinds */


const bindKeyHandlers = (game) => {
  $(document).on('keydown', keyBinds(game));
};
/* harmony export (immutable) */ __webpack_exports__["a"] = bindKeyHandlers;


const unBindKeyHandlers = (game) => {
  $(document).off('keydown');
};
/* unused harmony export unBindKeyHandlers */



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__breaker_js__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__board_js__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__life_bar_js__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__pointer_js__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util_js__ = __webpack_require__(0);






class Game {
  constructor() {
    this.breakers = [];
    this.currentAttackers = [];
    this.board = new __WEBPACK_IMPORTED_MODULE_1__board_js__["a" /* default */](this);
    this.startPos = [800, 800];
    this.DIM_X = 480;
    this.DIM_Y = 700;
    this.lifeBar = new __WEBPACK_IMPORTED_MODULE_2__life_bar_js__["a" /* default */]();
    this.pointer = new __WEBPACK_IMPORTED_MODULE_3__pointer_js__["a" /* default */]();
    this.initialSetup();
  }

  initialSetup() {
    this.addBreaker();
    this.addBreaker();
    this.addBreaker();
    this.board.addRow();
  }

  addBreaker() {
    const breaker = new __WEBPACK_IMPORTED_MODULE_0__breaker_js__["a" /* default */]({
      att: 40,
      pos: this.startPos,
      color: '#cb1414',
      side: __WEBPACK_IMPORTED_MODULE_4__util_js__["b" /* defaults */].breakerSide,
      skill: [],
      game: this,
    });

    this.breakers.push(breaker);
  }

  allObjects() {
    return [].concat(this.board.allMonsters(), this.currentAttackers, this.lifeBar, this.pointer);
  }

  draw(ctx) {
    ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
    this.allObjects().forEach((obj) => {
      obj.draw(ctx);
    });
  }

  moveObjects() {
    this.currentAttackers.forEach( breaker => {
      breaker.move();
    });
  }

  step() {
    this.moveObjects();
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

      if(breaker.pos[0] > this.DIM_X - __WEBPACK_IMPORTED_MODULE_4__util_js__["b" /* defaults */].breakerSide) {
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
    Object.assign(this.currentAttackers, this.breakers);
    let vel = this.pointer.calculateDir();
    let startPos = this.pointer.position();
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
    this.board.addRow();
    this.board.takeDamage();
    __WEBPACK_IMPORTED_MODULE_4__util_js__["a" /* bindKeyHandlers */](this);
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
}

Game.RESTPOS = [240, 600];
Game.RESTVEL = [0, 0];

/* harmony default export */ __webpack_exports__["a"] = (Game);


/***/ }),
/* 2 */
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
    // this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this));
  }

  animate() {
    this.game.step();
    this.game.draw(this.ctx);
    requestAnimationFrame(this.animate.bind(this));
  }
}

/* harmony default export */ __webpack_exports__["a"] = (GameView);


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__monster_js__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_js__ = __webpack_require__(0);



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
        if(monster.pos[1] >= 560) {
          toRemove = idx;
        }
      });
    });

    if(toRemove) {
      this.game.takeDamage(this.monsterRows[toRemove]);
      this.monsterRows.splice(toRemove, 1);
    }
  }

  assignMultiplier() {
    return Math.random() > 0.95 ? 1 : 100;
  }

  addRow() {
    let pos = [0, 0];
    const newRow = [];
    this.moveDown();
    this.monsterRows.push(this.spawn(this.max_monster_count, pos, newRow));
    this.level += 1;
  }

  spawn(num, pos, newRow) {
    if(num > 0) {
      if(Math.random() > .7) {
        let multiplier = this.assignMultiplier() || 2;
        let special = 0;
        if(Math.random() > .9) {
          special = 1;
        }
        newRow.push( new __WEBPACK_IMPORTED_MODULE_0__monster_js__["a" /* default */](
          (100 + this.level * multiplier),
          Object.assign([],pos),
          special)
        );
      }
      pos[0] += __WEBPACK_IMPORTED_MODULE_1__util_js__["b" /* defaults */].side;
      return this.spawn((num - 1), pos, newRow);
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
      let rowCopy = Object.assign([], row);
      rowCopy.forEach((mons, idx) => {
        if(mons.currHp <= 0) {
          if(mons.special === 1) {
            this.game.addBreaker();
          }
          row.splice(idx, 1);
        }
      });
    });
  }

}

const MAX_MONSTER_COUNT = 6;

/* harmony default export */ __webpack_exports__["a"] = (Board);


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__game_view_js__ = __webpack_require__(2);



document.addEventListener('DOMContentLoaded', () => {
  const canvasEl = document.getElementById('canvas');
  const ctx = canvasEl.getContext('2d');
  ctx.font = '20px Arial';
  const game = new __WEBPACK_IMPORTED_MODULE_0__game_js__["a" /* default */]();
  debugger
  new __WEBPACK_IMPORTED_MODULE_1__game_view_js__["a" /* default */](game, ctx).start();
});


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Breaker {
  constructor(options) {
    this.att = options.att;
    this.pos = options.pos;
    this.vel = options.vel || [0, 0];
    this.color = options.color;
    this.game = options.game;
    this.side = options.side;
    this.skill = options.skill;
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
    ctx.fill();
    ctx.stroke();
  }

  upgrade(pow) {
    this.att += pow;
  }

  move(multiplier = 1) {
    this.pos = [this.pos[0] + this.vel[0] * 2.5 * multiplier, this.pos[1] + this.vel[1] * 2.5 * multiplier];

    if(this.game.attackOver(this.pos)) {
      this.remove();
    }
  }

  remove() {
    this.game.remove(this);
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Breaker);


/***/ }),
/* 6 */
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
    ctx.rect(this.pos[0], this.pos[1], percentage * ctx.canvas.width, 20);
    ctx.fill();
    ctx.stroke();
  }

  drawText(ctx) {
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.beginPath();
    ctx.fillText(`${this.currLife} / ${this.maxLife} `, 195, 696.5, 150);
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
/* 7 */
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
    // ctx.drawImage(this.image, this.pos[0] - 15, this.pos[1] - 15, Util.defaults.side + 40, Util.defaults.side + 40);
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

  xRange() {
    const leftBound = this.pos[0];
    const rightBound = this.pos[0] + __WEBPACK_IMPORTED_MODULE_0__util_js__["b" /* defaults */].side;
    return [leftBound, rightBound];
  }

  yRange() {
    const topBound = this.pos[1];
    const bottomBound = this.pos[1]+ __WEBPACK_IMPORTED_MODULE_0__util_js__["b" /* defaults */].side;
    return [topBound, bottomBound];
  }

  takeHit(att) {
    this.currHp -= att;
  }

  collidedBottom(breaker) {
    let breakPos = breaker.pos;

    if( (this.yRange()[1] < breakPos[1]) && (this.yRange()[1] > breakPos[1] - 8) ) {
      let breakerLeft = breakPos[0];
      let breakerRight = breakPos[0] + __WEBPACK_IMPORTED_MODULE_0__util_js__["b" /* defaults */].breakerSide;

      if(__WEBPACK_IMPORTED_MODULE_0__util_js__["d" /* inBounds */](this.xRange(), breakerLeft) || __WEBPACK_IMPORTED_MODULE_0__util_js__["d" /* inBounds */](this.xRange(), breakerRight)) {
        return true;
      }
    }
    return false;
  }

  collidedTop(breaker) {
    let breakPos = breaker.pos;
    if( (this.yRange()[0] > breakPos[1] + __WEBPACK_IMPORTED_MODULE_0__util_js__["b" /* defaults */].breakerSide) && (this.yRange()[0] < breakPos[1] + 8 + __WEBPACK_IMPORTED_MODULE_0__util_js__["b" /* defaults */].breakerSide ) ) {
      let breakerLeft = breakPos[0];
      let breakerRight = breakPos[0] + __WEBPACK_IMPORTED_MODULE_0__util_js__["b" /* defaults */].breakerSide;

      if(__WEBPACK_IMPORTED_MODULE_0__util_js__["d" /* inBounds */](this.xRange(), breakerLeft) || __WEBPACK_IMPORTED_MODULE_0__util_js__["d" /* inBounds */](this.xRange(),breakerRight)) {
        return true;
      }
    }
    return false;
  }

  collidedRight(breaker) {
    let breakPos = breaker.pos;
    if( (this.xRange()[1] < breakPos[0]) && (this.xRange()[1] > breakPos[0] - 8)) {
      let breakerTop = breakPos[1];
      let breakerBot = breakPos[1] + __WEBPACK_IMPORTED_MODULE_0__util_js__["b" /* defaults */].breakerSide;

      if(__WEBPACK_IMPORTED_MODULE_0__util_js__["d" /* inBounds */](this.yRange(), breakerTop) || __WEBPACK_IMPORTED_MODULE_0__util_js__["d" /* inBounds */](this.yRange(), breakerBot)) {
        return true;
      }
    }
    return false;
  }

  collidedLeft(breaker) {
    let breakPos = breaker.pos;
    if( (this.xRange()[0] > breakPos[0] + __WEBPACK_IMPORTED_MODULE_0__util_js__["b" /* defaults */].breakerSide) && (this.xRange()[0] < breakPos[0] + 8 + __WEBPACK_IMPORTED_MODULE_0__util_js__["b" /* defaults */].breakerSide)) {
      let breakerTop = breakPos[1];
      let breakerBot = breakPos[1] + __WEBPACK_IMPORTED_MODULE_0__util_js__["b" /* defaults */].breakerSide;

      if(__WEBPACK_IMPORTED_MODULE_0__util_js__["d" /* inBounds */](this.yRange(), breakerTop) || __WEBPACK_IMPORTED_MODULE_0__util_js__["d" /* inBounds */](this.yRange(), breakerBot)) {
        return true;
      }
    }
    return false;
  }
}

/* harmony default export */ __webpack_exports__["a"] = (Monster);


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
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

/* harmony default export */ __webpack_exports__["a"] = (Pointer);


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map