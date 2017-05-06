import Monster from './monster.js';
import * as Util from './util.js';

class Board {
  constructor() {
    this.monsterRows = [];
    this.level = 1;
    this.addRow();
  }

  moveDown() {
    this.monsterRows.forEach( (row) => {
      row.forEach( (monster) => monster.moveDown());
    });
  }

  addRow() {
    let pos = [0, 0];
    const newRow = [];
    this.moveDown();
    this.monsterRows.push(this.times(6, pos, newRow));
  }

  times(x, pos, newRow) {
    if(x > 0) {
      if(Math.random() > .7) {
        newRow.push( new Monster((100 + this.level * 10), Object.assign([],pos)));
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
        if(mons.currHp < 0) {
          row.splice(idx, 1);
        }
      });
    });
  }

}

export default Board;
