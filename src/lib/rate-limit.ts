/**
 * Простое ограничение частоты запросов в памяти процесса (защита /api/host и /api/uploads от спама).
 * Для serverless-функций Vercel этого достаточно как первой линии защиты —
 * основная проверка дублируется по времени последней записи в Supabase.
 */
const buckets = new Map<string, number[]>();
const WINDOW_MS = 60_000; // 1 минута
const MAX_REQUESTS = 5;

export function isRateLimited(key: string): boolean {
  const now = Date.now();
  const timestamps = (buckets.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  timestamps.push(now);
  buckets.set(key, timestamps);
  return timestamps.length > MAX_REQUESTS;
}
