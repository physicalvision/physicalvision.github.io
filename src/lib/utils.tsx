/**
 * Combines multiple class names into a single string.
 * Filters out falsy values and joins with spaces.
 */
export function cn(...inputs: (string | undefined | null | boolean)[]): string {
  return inputs.filter(Boolean).join(" ")
}
