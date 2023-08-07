export function formatDate(dateStr: string): string {
  const date = new Date(dateStr);

  let day: string = ("0" + date.getDate()).slice(-2); // Pad with leading 0 if needed
  let month: string = ("0" + (date.getMonth() + 1)).slice(-2); // JavaScript months are 0-based, so add 1
  let year: string = date.getFullYear().toString();

  return `${day}/${month}/${year}`;
}
