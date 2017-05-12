export const defaults = ({
  side: 80,
  breakerSide: 80 / 2.7,
  speed: 4,
});

export const randomColor = () => {
  const hexDigits = '0123456789ABCDEF';

  let color = "#";
  for (let i = 0; i < 3; i++) {
    color += hexDigits[Math.floor(Math.random() * 16)];
  }

  return color;
};

export const inBounds = (range, val) => {
  return (range[0] < val && range[1] > val);
};

export const keyBinds = (game) => {
  return (e) => {
      e.preventDefault();
      game.runTurn();
      unBindKeyHandlers(game);
  };
};

export const angleBind = (game) => {
  return (e) => {
    game.pointer.setAngle([e.offsetX, e.offsetY]);
  };
};

export const bindKeyHandlers = (game) => {
  $('#canvas').on('mousedown', keyBinds(game));
  $('#canvas').on('mousemove', angleBind(game));
};

export const unBindKeyHandlers = (game) => {
  $('#canvas').off('mousedown');
};
