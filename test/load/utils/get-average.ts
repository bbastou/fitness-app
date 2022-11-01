export const getAverage = (list: number[]): number => {
  const sum = list.reduce((a, b) => a + b, 0);

  return sum / list.length;
};
