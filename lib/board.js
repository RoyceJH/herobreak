import Monster from './monster.js';
import * as Util from './util.js';

class Board {
  constructor(game) {
    this.monsterRows = [];
    this.level = 0;
    this.addRow();
    this.game = game;
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

  addRow() {
    let pos = [0, 0];
    const newRow = [];
    this.moveDown();
    this.monsterRows.push(this.times(6, pos, newRow));
    this.level += 1;
  }

  assignSpecial() {
    let chance = Math.random();
    return chance > 0.95 ? 1 : 100;
  }

  times(x, pos, newRow) {
    if(x > 0) {
      if(Math.random() > .7) {
        let multiplier = this.assignSpecial() || 2;
        let special = 0;
        if(Math.random() > .9) {
          special = 1;
        }
        newRow.push( new Monster((100 + this.level * multiplier), Object.assign([],pos), special));
      }
      pos[0] += Util.defaults.side;
      return this.times((x - 1), pos, newRow);
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

export default Board;
