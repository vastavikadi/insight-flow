export const decodePath = (value: string) => {
  try {
    return decodeURIComponent(decodeURIComponent(value));
  } catch {
    try {
      return decodeURIComponent(value);
    } catch {
      return value;
    }
  }
};