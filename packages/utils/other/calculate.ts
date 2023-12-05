export const calcPercent = (percent: number, max: number): number => {
  return (max / 100) * percent; // = x
};
export const calcValuePercent = (value: number, max: number): number => {
  return (value / max) * 100;
};
export const getRandomInt = (max: number, min = 0): number => {
  return Math.floor(getRandomFloat(max, min));
};
export const getRandomFloat = (max: number, min = 0): number => {
  return Math.random() * (max - min) + min;
};
export const isRandomChance = (chance: number): boolean => {
  return getRandomFloat(100, 0) <= chance;
};
export const getRandomItem = <T>(arr: T[]): T => {
  return arr[getRandomInt(arr.length, 0)];
};
export const calcAverage = (...values: number[]): number => {
  return values.reduce((acc, el) => acc + el, 0) / values.length;
};
