/**
 * Format a date.
 * @param timestamp string
 * @return string
*/
export function getFormatDate(timestamp: string): string {
  return timestamp ? new Date(timestamp).toLocaleDateString('en-EN', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  }) : 'Date inconnue'
}
