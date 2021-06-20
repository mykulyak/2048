# 2048

Logic for 2048-like games.

## Usage

```ts
import Game, { Direction } from '@mykulyak/2048';

// 1. create game
const game = Game.create({ size: 4, bricksPerStep: 1 });

// 2. make moves
game.slide(Direction.North);
game.slide(Direction.West);
game.slide(Direction.South);
game.slide(Direction.East);

// 3. check game status
if (game.gameOver) {
  // ... do something ...
}

// 4. reset game
```
