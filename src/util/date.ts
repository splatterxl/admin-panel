export function getMonthDifference(start: Date, end: Date) {
  return (
    end.getMonth() -
    start.getMonth() +
    12 * (end.getFullYear() - start.getFullYear())
  )
}
