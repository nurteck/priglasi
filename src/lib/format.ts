/** Цена с пробелом-разделителем тысяч: 2500 → "2 500 сом". */
export function formatSom(price: number): string {
  return `${new Intl.NumberFormat("ru-RU").format(price)} сом`;
}
