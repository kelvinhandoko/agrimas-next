/**
 * Splits text in different case formats (PascalCase, camelCase, snake_case) into space-separated words
 * @param text The input text to split
 * @returns The text split into space-separated words
 */
export function splitText(textOriginal: string): string {
  if (!textOriginal) return "";
  const text = textOriginal.toLowerCase();
  // Handle snake_case and kebab-case
  if (text.includes("_") || text.includes("-")) {
    return text.replace(/[_-]/g, " ");
  }

  // Handle camelCase and PascalCase
  return (
    text
      // Insert space before capital letters
      .replace(/([A-Z])/g, " $1")
      // Handle consecutive capitals (e.g., APIKey)
      .replace(/([A-Z])([A-Z])([a-z])/g, "$1 $2$3")
      // Trim any extra spaces and convert to lowercase
      .trim()
      .toLowerCase()
  );
}
