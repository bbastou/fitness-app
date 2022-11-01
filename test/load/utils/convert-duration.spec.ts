import { convertMilisecondsDurationInSeconds } from './convert-durations';

describe('Convert duration', () => {
  it('should convert to one second', () => {
    // Given
    const start = 1667301759595;
    const end = 1667301760595;

    // When
    const seconds = convertMilisecondsDurationInSeconds(start, end);

    // Then
    expect(seconds).toBe(1);
  });
});
