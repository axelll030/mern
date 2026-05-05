export function formatDate(date) {
  const dateFormated = new Date(date);
  return dateFormated.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
