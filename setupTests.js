expect.extend({
  toHaveBoard(gameObj, expectedBoard) {
    const boardData = gameObj.boardData();
    for (let row = 0; row < expectedBoard.length; row += 1) {
      for (let col = 0; col < expectedBoard[row].length; col += 1) {
        const actual = boardData[row * gameObj.size + col];
        const expected = expectedBoard[row][col];
        if (actual !== expected) {
          return {
            pass: false,
            message: () =>
              `expected value[${row}][${col}] to equal ${expected}, but got ${actual} instead`,
          };
        }
      }
    }
    return {
      pass: true,
      message: () => "",
    };
  },
});
