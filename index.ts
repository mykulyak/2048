export type CreateOptions =
  | {
      size: number;
      bricksPerStep: number;
    }
  | {
      board: number[][];
      bricksPerStep: number;
      score?: number;
      step?: number;
    };

export enum Direction {
  North = 1,
  South = 2,
  East = 4,
  West = 8,
}

/**
 * Objects of this class represent instances of 2048-like games.
 *
 * Each object has the following attributes:
 *
 * size board size
 * bricksPerStep the number of new bricks apperaring each turn
 * score current game score
 * step current turn number
 */
export default class Game {
  public readonly size: number;
  public readonly bricksPerStep: number;
  private readonly board: number[][];
  public score: number;
  public step: number;
  public gameOver: boolean;

  static create(options: CreateOptions): Game {
    let result: Game;
    if ("size" in options) {
      result = new Game(options.size, options.bricksPerStep);
    } else {
      result = new Game(options.board!.length, options.bricksPerStep);
      options.board!.forEach((rowData, row) =>
        rowData.forEach((value, col) => {
          result.board[row][col] = value;
        })
      );
      result.score = options.score || 0;
      result.step = options.step || 0;
    }
    return result;
  }

  constructor(size: number, bricksPerStep: number) {
    this.size = size;
    this.bricksPerStep = bricksPerStep;
    this.board = Array.from({ length: size }, () =>
      Array.from({ length: size }, () => 0)
    );
    this.score = 0;
    this.step = 0;
    this.gameOver = false;
  }

  private slideNorth(): void {
    for (let columnIndex = 0; columnIndex < this.size; columnIndex += 1) {
      let columnData = Array.from(
        { length: this.size },
        (_, rowIndex) => this.board[rowIndex][columnIndex]
      ).filter((value) => value > 0);
      for (let rowIndex = 1; rowIndex < this.size; rowIndex += 1) {
        const prevValue = columnData[rowIndex - 1] || 0;
        const currValue = columnData[rowIndex] || 0;
        if (prevValue > 0 && prevValue === currValue) {
          columnData[rowIndex - 1] = 2 * prevValue;
          columnData[rowIndex] = 0;
          this.score += 2 * prevValue;
        }
      }
      columnData = columnData.filter((value) => value > 0);
      for (let rowIndex = 0; rowIndex < this.size; rowIndex += 1) {
        this.board[rowIndex][columnIndex] = columnData[rowIndex] || 0;
      }
    }
  }

  private slideSouth(): void {
    for (let columnIndex = 0; columnIndex < this.size; columnIndex += 1) {
      let columnData = Array.from(
        { length: this.size },
        (_, rowIndex) => this.board[rowIndex][columnIndex]
      )
        .filter((value) => value > 0)
        .reverse();
      for (let rowIndex = 1; rowIndex < this.size; rowIndex += 1) {
        const prevValue = columnData[rowIndex - 1] || 0;
        const currValue = columnData[rowIndex] || 0;
        if (prevValue > 0 && prevValue === currValue) {
          columnData[rowIndex - 1] = 2 * prevValue;
          columnData[rowIndex] = 0;
          this.score += 2 * prevValue;
        }
      }
      columnData = columnData.filter((value) => value > 0);
      for (let rowIndex = this.size - 1; rowIndex >= 0; rowIndex -= 1) {
        this.board[rowIndex][columnIndex] =
          columnData[this.size - rowIndex - 1] || 0;
      }
    }
  }

  private slideWest(): void {
    for (let rowIndex = 0; rowIndex < this.size; rowIndex += 1) {
      let rowData = Array.from(
        { length: this.size },
        (_, columnIndex) => this.board[rowIndex][columnIndex]
      ).filter((value) => value > 0);
      for (let columnIndex = 1; columnIndex < this.size; columnIndex += 1) {
        const prevValue = rowData[columnIndex - 1] || 0;
        const currValue = rowData[columnIndex] || 0;
        if (prevValue > 0 && prevValue === currValue) {
          rowData[columnIndex - 1] = 2 * prevValue;
          rowData[columnIndex] = 0;
          this.score += 2 * prevValue;
        }
      }
      rowData = rowData.filter((value) => value > 0);
      for (let columnIndex = 0; columnIndex < this.size; columnIndex += 1) {
        this.board[rowIndex][columnIndex] = rowData[columnIndex] || 0;
      }
    }
  }

  private slideEast(): void {
    for (let rowIndex = 0; rowIndex < this.size; rowIndex += 1) {
      let rowData = Array.from(
        { length: this.size },
        (_, columnIndex) => this.board[rowIndex][columnIndex]
      )
        .filter((value) => value > 0)
        .reverse();
      for (let columnIndex = 1; columnIndex < this.size; columnIndex += 1) {
        const prevValue = rowData[columnIndex - 1] || 0;
        const currValue = rowData[columnIndex] || 0;
        if (prevValue > 0 && prevValue === currValue) {
          rowData[columnIndex - 1] = 2 * prevValue;
          rowData[columnIndex] = 0;
          this.score += 2 * prevValue;
        }
      }
      rowData = rowData.filter((value) => value > 0);
      for (
        let columnIndex = this.size - 1;
        columnIndex >= 0;
        columnIndex -= 1
      ) {
        this.board[rowIndex][columnIndex] =
          rowData[this.size - columnIndex - 1] || 0;
      }
    }
  }

  private findEmptyCells(): [number, number][] {
    const result: [number, number][] = [];
    for (let rowIndex = 0; rowIndex < this.size; rowIndex += 1) {
      for (let columnIndex = 0; columnIndex < this.size; columnIndex += 1) {
        if (this.board[rowIndex][columnIndex] === 0) {
          result.push([rowIndex, columnIndex]);
        }
      }
    }
    return result;
  }

  private addNewPieces(emptyCells: [number, number][]) {
    let bricksPerStep = this.bricksPerStep;
    while (emptyCells.length > 0 && bricksPerStep > 0) {
      const x = Math.random();
      const cellIndex = Math.floor(emptyCells.length * x);
      const [rowIndex, columnIndex] = emptyCells[cellIndex];
      const value = this.size > 4 && Math.random() > 0.5 ? 4 : 2;
      this.board[rowIndex][columnIndex] = value;
      emptyCells.splice(cellIndex);
      bricksPerStep -= 1;
    }
  }

  slide(direction: Direction): void {
    switch (direction) {
      case Direction.North:
        this.slideNorth();
        break;
      case Direction.South:
        this.slideSouth();
        break;
      case Direction.West:
        this.slideWest();
        break;
      case Direction.East:
        this.slideEast();
        break;
    }

    const emptyCells = this.findEmptyCells();
    if (emptyCells.length > 0) {
      this.addNewPieces(emptyCells);
      this.step += 1;
    } else {
      this.gameOver = true;
    }
  }

  reset(): void {
    this.board.forEach((row) => row.fill(0));
    this.score = 0;
    this.step = 0;
    this.gameOver = false;
  }

  boardData(): number[] {
    return this.board.reduce((accum, row) => accum.concat(row), []);
  }

  print(): void {
    let result = "";
    for (let rowIndex = 0; rowIndex < this.size; rowIndex += 1) {
      if (rowIndex > 0) {
        result += "\n";
      }
      for (let columnIndex = 0; columnIndex < this.size; columnIndex += 1) {
        if (columnIndex > 0) {
          result += "-";
        }
        result += this.board[rowIndex][columnIndex];
      }
    }
    console.log(result);
  }
}
