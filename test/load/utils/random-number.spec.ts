import { randomIntFromInterval } from './random-number';

describe('Random number', () => {
  it('should give two differents values', () => {
    // Given
    const rangeStart = 1;
    const rangeEnd = 100_000_000;

    // When
    const randomNumber1 = randomIntFromInterval(rangeStart, rangeEnd);
    const randomNumber2 = randomIntFromInterval(rangeStart, rangeEnd);

    // Then
    expect(randomNumber1).not.toBe(randomNumber2);
  });
  it('should give a value between range', () => {
    // Given
    const rangeStart = 1;
    const rangeEnd = 3;

    // When
    const randomNumber = randomIntFromInterval(rangeStart, rangeEnd);

    // Then
    expect(randomNumber).toBeGreaterThanOrEqual(rangeStart);
    expect(randomNumber).toBeLessThanOrEqual(rangeEnd);
  });
});
