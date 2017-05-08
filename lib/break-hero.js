import Game from './game.js';
import GameView from './game_view.js';

document.addEventListener('DOMContentLoaded', () => {
  const canvasEl = document.getElementById('canvas');
  const ctx = canvasEl.getContext('2d');

  $('.close').click((e) => {
    $('.modal').hide();
  });

  var background = new Image();
  background.src = 'assets/bg.png';
  background.onload = () => {
    ctx.drawImage(background, 0, 0);
  };

  ctx.font = '20px Arial';
  const game = new Game();
  new GameView(game, ctx).start();
});
