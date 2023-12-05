export function isArrayHaveIds(ids: string[], arr: Array<{ id: string }>): boolean {
  const mapIds = ids.reduce((acc, id) => ({ ...acc, [id]: true }), {});

  for (const el of arr) {
    if (!(el.id in mapIds)) {
      return false;
    }
  }

  return true;
}
