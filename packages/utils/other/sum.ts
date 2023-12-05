export function sumToTarget(target: number, from = 0): number {
  let result = 0;

  for (let i = from; i <= target; i++) {
    result += i;
  }

  return result;
}
