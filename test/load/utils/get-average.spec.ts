import { getAverage } from './get-average';

describe('Get average', () => {
  it('should calculate average', () => {
    // Given
    const list = [1, 1, 10, 10];

    // When
    const average = getAverage(list);

    // Then
    expect(average).toBe(5.5);
  });
});
