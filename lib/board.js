import Monster from './monster.js';
import Boss from './boss.js';
import * as Util from './util.js';

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

  updateLevel() {
    this.level += 1;
    $('.level-counter').text(`Level: ${this.level} / 15`);
  }

  addRow() {
    let pos = [0, 0];
    const newRow = [];
    this.moveDown();
    if(this.level < 17 || this.level > 18) {
      this.monsterRows.push(this.spawn(this.max_monster_count, pos, newRow));
    } else if(this.level === 18) {
      this.monsterRows.push([new Boss(100 + this.level * 10)]);
    }
    this.updateLevel();
  }

  spawn(num, pos, newRow, any = false) {
    let multiplier = this.assignMultiplier() || 2;
    let special = 0;

    if(num > 0) {
      if(Math.random() > .6) {
        if(Math.random() > .9) {
          special = 1;
        }
        newRow.push( new Monster(
          (100 + this.level * 10),
          Object.assign([],pos),
          special)
        );

        any = true;
      }

      pos[0] += Util.defaults.side;
      return this.spawn((num - 1), pos, newRow, any);
    }

    if(num === 1 && any === false) {
      newRow.push( new Monster(
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
      let rowCopy = Object.assign([], row);
      rowCopy.forEach((mons, idx) => {
        if(mons.currHp <= 0) {
          this.game.addGold(mons.totalHp);
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

export default Board;
