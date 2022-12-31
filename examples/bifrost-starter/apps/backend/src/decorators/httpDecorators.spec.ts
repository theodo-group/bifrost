import { paramsHavePath } from './httpDecorators';

describe('paramsHavePath', () => {
  it('should return true if params is empty', () => {
    expect(paramsHavePath([])).toBe(true);
  });
  it('should return true if params has 2 elements', () => {
    expect(paramsHavePath([undefined, undefined])).toBe(true);
  });
  it('should return true if params has 1 element and it is a string', () => {
    expect(paramsHavePath([''])).toBe(true);
  });
  it('should return false if params has 1 element and it is not a string', () => {
    expect(paramsHavePath([undefined])).toBe(false);
  });
});
