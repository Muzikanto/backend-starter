export const StringToRegexConvert = (value: string | undefined): RegExp | null => {
  if (!value) {
    return null;
  }

  try {
    return new RegExp(value, 'i');
  } catch (e) {
    return null;
  }
};
