import Game, { Direction } from "./index";

let spy: jest.SpyInstance<unknown, unknown[]>;

beforeEach(() => {
  spy = jest.spyOn(Math, "random");
});

afterEach(() => {
  spy.mockRestore();
});

test("constructor creates an empty game", () => {
  const game = new Game(4, 1);
  expect(game.size).toBe(4);
  expect(game.bricksPerStep).toBe(1);
  expect(game.score).toBe(0);
  expect(game.gameOver).toBeFalsy();
  expect(game).toHaveBoard([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ]);
});

describe("slideNorth", () => {
  beforeEach(() => {
    // put new piece in [3, 3], its value will always be 2
    spy.mockReturnValue(0.9999);
  });

  test("empty line", () => {
    const game = Game.create({
      bricksPerStep: 1,
      board: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
    });
    game.slide(Direction.North);
    expect(game).toHaveBoard([
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 2],
    ]);
    expect(game.step).toBe(1);
    expect(game.score).toBe(0);
    expect(game.gameOver).toBeFalsy();
  });

  test("line with a single element", () => {
    const game = Game.create({
      bricksPerStep: 1,
      board: [
        [0, 0, 0, 1],
        [0, 0, 1, 0],
        [0, 1, 0, 0],
        [1, 0, 0, 0],
      ],
    });
    game.slide(Direction.North);
    expect(game).toHaveBoard([
      [1, 1, 1, 1],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 2],
    ]);
  });

  test("line with a mergeable cells", () => {
    const game = Game.create({
      bricksPerStep: 1,
      board: [
        [1, 0, 0, 2],
        [0, 0, 1, 2],
        [0, 1, 0, 0],
        [1, 1, 1, 0],
      ],
    });
    game.slide(Direction.North);
    expect(game).toHaveBoard([
      [2, 2, 2, 4],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 2],
    ]);
    expect(game.score).toBe(10);
  });

  test("complex scenario", () => {
    const game = Game.create({
      bricksPerStep: 1,
      board: [
        [1, 2, 0, 2],
        [0, 2, 1, 2],
        [1, 1, 8, 1],
        [1, 1, 1, 0],
      ],
    });
    game.slide(Direction.North);
    expect(game).toHaveBoard([
      [2, 4, 1, 4],
      [1, 2, 8, 1],
      [0, 0, 1, 0],
      [0, 0, 0, 2],
    ]);
    expect(game.score).toBe(12);
  });
});

describe("slideSouth", () => {
  beforeEach(() => {
    // put new piece in [0, 0], its value will always be 2
    spy.mockReturnValue(0.0001);
  });

  test("empty line", () => {
    const game = Game.create({
      bricksPerStep: 1,
      board: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
    });
    game.slide(Direction.South);
    expect(game).toHaveBoard([
      [2, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);
    expect(game.step).toBe(1);
    expect(game.score).toBe(0);
    expect(game.gameOver).toBeFalsy();
  });

  test("line with a single element", () => {
    const game = Game.create({
      bricksPerStep: 1,
      board: [
        [0, 0, 0, 1],
        [0, 0, 1, 0],
        [0, 1, 0, 0],
        [1, 0, 0, 0],
      ],
    });
    game.slide(Direction.South);
    expect(game).toHaveBoard([
      [2, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [1, 1, 1, 1],
    ]);
  });

  test("line with a mergeable cells", () => {
    const game = Game.create({
      bricksPerStep: 1,
      board: [
        [1, 0, 0, 2],
        [0, 0, 1, 2],
        [0, 1, 0, 0],
        [1, 1, 1, 0],
      ],
    });
    game.slide(Direction.South);
    expect(game).toHaveBoard([
      [2, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [2, 2, 2, 4],
    ]);
    expect(game.score).toBe(10);
  });

  test("complex scenario", () => {
    const game = Game.create({
      bricksPerStep: 1,
      board: [
        [1, 2, 0, 2],
        [0, 2, 1, 2],
        [1, 1, 8, 1],
        [1, 1, 1, 0],
      ],
    });
    game.slide(Direction.South);
    expect(game).toHaveBoard([
      [2, 0, 0, 0],
      [0, 0, 1, 0],
      [1, 4, 8, 4],
      [2, 2, 1, 1],
    ]);
    expect(game.score).toBe(12);
  });
});

describe("slideWest", () => {
  beforeEach(() => {
    // put new piece in [3, 3], its value will always be 2
    spy.mockReturnValue(0.9999);
  });

  test("empty line", () => {
    const game = Game.create({
      bricksPerStep: 1,
      board: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
    });
    game.slide(Direction.West);
    expect(game).toHaveBoard([
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 2],
    ]);
    expect(game.step).toBe(1);
    expect(game.score).toBe(0);
    expect(game.gameOver).toBeFalsy();
  });

  test("line with a single element", () => {
    const game = Game.create({
      bricksPerStep: 1,
      board: [
        [0, 0, 0, 1],
        [0, 0, 1, 0],
        [0, 1, 0, 0],
        [1, 0, 0, 0],
      ],
    });
    game.slide(Direction.West);
    expect(game).toHaveBoard([
      [1, 0, 0, 0],
      [1, 0, 0, 0],
      [1, 0, 0, 0],
      [1, 0, 0, 2],
    ]);
  });

  test("line with a mergeable cells", () => {
    const game = Game.create({
      bricksPerStep: 1,
      board: [
        [1, 0, 0, 2],
        [0, 0, 1, 2],
        [0, 1, 0, 0],
        [1, 1, 1, 0],
      ],
    });
    game.slide(Direction.West);
    expect(game).toHaveBoard([
      [1, 2, 0, 0],
      [1, 2, 0, 0],
      [1, 0, 0, 0],
      [2, 1, 0, 2],
    ]);
    expect(game.score).toBe(2);
  });

  test("complex scenario", () => {
    const game = Game.create({
      bricksPerStep: 1,
      board: [
        [1, 2, 0, 2],
        [0, 2, 1, 2],
        [1, 1, 8, 1],
        [1, 1, 1, 0],
      ],
    });
    game.slide(Direction.West);
    expect(game).toHaveBoard([
      [1, 4, 0, 0],
      [2, 1, 2, 0],
      [2, 8, 1, 0],
      [2, 1, 0, 2],
    ]);
    expect(game.score).toBe(8);
  });
});

describe("slideEast", () => {
  beforeEach(() => {
    // put new piece in [0, 0], its value will always be 2
    spy.mockReturnValue(0.0001);
  });

  test("empty line", () => {
    const game = Game.create({
      bricksPerStep: 1,
      board: [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
      ],
    });
    game.slide(Direction.East);
    expect(game).toHaveBoard([
      [2, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]);
    expect(game.step).toBe(1);
    expect(game.score).toBe(0);
    expect(game.gameOver).toBeFalsy();
  });

  test("line with a single element", () => {
    const game = Game.create({
      bricksPerStep: 1,
      board: [
        [0, 0, 0, 1],
        [0, 0, 1, 0],
        [0, 1, 0, 0],
        [1, 0, 0, 0],
      ],
    });
    game.slide(Direction.East);
    expect(game).toHaveBoard([
      [2, 0, 0, 1],
      [0, 0, 0, 1],
      [0, 0, 0, 1],
      [0, 0, 0, 1],
    ]);
  });

  test("line with a mergeable cells", () => {
    const game = Game.create({
      bricksPerStep: 1,
      board: [
        [1, 0, 0, 2],
        [0, 0, 1, 2],
        [0, 1, 0, 0],
        [1, 1, 1, 0],
      ],
    });
    game.slide(Direction.East);
    expect(game).toHaveBoard([
      [2, 0, 1, 2],
      [0, 0, 1, 2],
      [0, 0, 0, 1],
      [0, 0, 1, 2],
    ]);
    expect(game.score).toBe(2);
  });

  test("complex scenario", () => {
    const game = Game.create({
      bricksPerStep: 1,
      board: [
        [1, 2, 0, 2],
        [0, 2, 1, 2],
        [1, 1, 8, 1],
        [1, 1, 1, 0],
      ],
    });
    game.slide(Direction.East);
    expect(game).toHaveBoard([
      [2, 0, 1, 4],
      [0, 2, 1, 2],
      [0, 2, 8, 1],
      [0, 0, 1, 2],
    ]);
    expect(game.score).toBe(8);
  });
});

test("gameOver condition", () => {
  const game = Game.create({
    bricksPerStep: 1,
    board: [
      [1, 2, 4, 8],
      [2, 4, 8, 16],
      [4, 8, 16, 32],
      [8, 16, 32, 64],
    ],
  });
  expect(game.gameOver).toBeFalsy();
  game.slide(Direction.East);
  expect(game).toHaveBoard([
    [1, 2, 4, 8],
    [2, 4, 8, 16],
    [4, 8, 16, 32],
    [8, 16, 32, 64],
  ]);
  expect(game.gameOver).toBeTruthy();
});
