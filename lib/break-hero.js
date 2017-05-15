import Game from './game.js';
import GameView from './game_view.js';

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
    const game = new Game();
    new GameView(game, ctx).start();
  };

  newGame();
});
