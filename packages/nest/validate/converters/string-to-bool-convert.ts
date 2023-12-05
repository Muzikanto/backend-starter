export const StringToBoolConvert = (value: string | boolean): boolean | null => {
  if (typeof value === 'boolean') {
    return value;
  }
  if (typeof value !== 'string') {
    return null;
  }

  return value === 'True' || value === 'true';
};
