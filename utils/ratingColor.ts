
// * ENUMS
export enum BorderColor {
  green = "border-green-600",
  orange = "border-orange-600",
  red = "border-red-600",
  blue = "border-blue-600",
}
export enum TextColor {
  green = "text-green-600",
  orange = "text-orange-600",
  red = "text-red-600",
  blue = "text-blue-600",
}
export enum HexColor {
  green = "#16a34a",
  orange = "#ea580c",
  red = "#dc2626",
  blue = "#2563eb",
}

/**
 * Format a date.
 * @param timestamp string
 * @return string
*/
export function getColorRating(score: number, maxScore: number, enumColor: typeof BorderColor|typeof TextColor|typeof HexColor): string {
  const highThreshold = 0.75 * maxScore;
  const lowThreshold = 0.5 * maxScore;
  if (score >= highThreshold && score <= maxScore) {
    return enumColor.green;
  } else if (score >= lowThreshold && score < highThreshold) {
    return enumColor.orange;
  } else {
    return enumColor.red;
  }
}
