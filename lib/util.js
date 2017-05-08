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
    if(e.keyCode == '32') {
      e.preventDefault();
      game.runTurn();
      unBindKeyHandlers(game);
    } else if (e.keyCode == '37') {
      game.pointer.rotate(-4);
    } else if (e.keyCode == '39') {
      game.pointer.rotate(4);
    }
  };
};

export const bindKeyHandlers = (game) => {
  $(document).on('keydown', keyBinds(game));
};

export const unBindKeyHandlers = (game) => {
  $(document).off('keydown');
};
