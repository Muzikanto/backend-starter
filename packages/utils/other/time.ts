export function sleep(time: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, time));
}
export function waitFor(check: () => Promise<boolean>, interval: number): Promise<void> {
  let i = 0;

  return new Promise((resolve) => {
    const intervalId = setInterval(async () => {
      const is = await check();

      if (is) {
        resolve();
        clearInterval(intervalId);
        return;
      }

      i++;

      if (i > 100) {
        clearInterval(intervalId);
        resolve();
      }
    }, interval);
  });
}
export function noop(): void {
  return;
}
