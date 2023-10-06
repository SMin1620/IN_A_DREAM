export function padNumber(num: number | undefined): string {
  if (num === undefined) {
    return "";
  }
  return num < 10 ? `0${num}` : `${num}`;
}
