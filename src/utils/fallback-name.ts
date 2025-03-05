export const fallbackName = (name: string) => {
  const result = name
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return result;
};
