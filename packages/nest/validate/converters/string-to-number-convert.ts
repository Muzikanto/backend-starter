export const StringToNumberConvert = (value: string): number | null => {
  const result = parseInt(value);
  if (Number.isNaN(result)) {
    return null;
  }
  return result;
};
