export const convertMilisecondsDurationInSeconds = (
  start: number,
  end: number,
) => (end - start) / 1_000;
