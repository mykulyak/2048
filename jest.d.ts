declare namespace jest {
  interface Matchers<R> {
    toHaveBoard(expectedBoard: number[][]): CustomMatcherResult;
  }
}
