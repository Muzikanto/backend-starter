export function randomSort(): number {
  return Math.random() - 0.5;
}
export function sortDesc(a: number, b: number): number {
  return a > b ? -1 : 1;
}
export function reduceSum(acc: number, el: number): number {
  return acc + el;
}
export const sortAsc = (a: number, b: number) => {
  return a < b ? -1 : 1;
};
export const sortByOrder = <T extends { id: string }>(arr: T[], order: string[]): T[] => {
  const map = new Map(arr.map((el) => [el.id, el]));

  return order.map((id) => map.get(id) as T);
};
