# HeroBreak - Proposal

## Background

HeroBreak is a variation of the classic Brick Breaker game. The goal of HeroBreak is to make it through levels consisting of decreasing monster bricks. Players will angle their hero and their soldiers with varying attack power to destroy oncoming monster bricks. Depending on the hero chosen, the soldier's will have varied abilities.

## MVP

- [ ] Toggle between heroes to employ different abilities
- [ ] Select the angle to launch attacks
- [ ] Select the difficulty level

## Wireframes

This app will consist of a single screen with a game board, game controls, and nav links to the Github, my LinkedIn, and the About modal. Game controls will include left, right, and launch.

![wireframes](/gamescreen.png)

## Architecture and Technologies

This app will be implemented with the following technologies:

- `JavaScript` for game logic,
- `canvas`

`monsters.js`: will handle the logic of filling the rows with monsters and keeping track of hit points

`breakers.js`: will handle construction and keeping track of attacking units

`herobreak.js`: will handle the logic of attackers, collisions, and the overall game flow

## Implementation Timeline

**Day 1**: Setup all necessary modules, including webpack, the `Easel.js` used to render elements onto the screen. Write the basics of `monsters` and `breakers`. Learn the implementation of the `Easel.js` to render elements on canvas.

**Day 2**: Dedicate day to learn the `Easel.js` API. Implementation of rendering `monsters` and `breakers` onto canvas. Start the basics of collision, attack and hit point relationships.

**Day 3**: Continue working on collision and implement rules and logic of game flow. Start building out special abilities of heroes.

**Day 4**: Finalize on how the game flows, fixing up minute details. Styling of frontend.

## Bonus Features

TBD
