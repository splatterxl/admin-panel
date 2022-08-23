export const greeting = () => {
  const hour = new Date().getHours()

  return hour < 12 ? "morning" : hour < 17 ? "afternoon" : "evening"
}
