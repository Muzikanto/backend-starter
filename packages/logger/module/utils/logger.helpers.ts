export const getParsedResult = (result: any) => {
  try {
    return JSON.stringify(result);
  } catch {
    return result;
  }
};
export function formatErrMessage(err: any): string {
  if (!err.extra || !err.extra.target) {
    return err.response?.message || err.message;
  }

  return `${err.extra.method}(${getParsedResult(err.extra.args)}) => ${err.response?.message || err.message}`;
}
