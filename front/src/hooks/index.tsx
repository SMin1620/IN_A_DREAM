export function padNumber(num: number): string {
  return num < 10 ? `0${num}` : `${num}`;
}
