export const avatarFormatter = (name: string) => {
  return name
    .split(" ")
    .map((s) => s[0]?.toUpperCase())
    .join("");
};
