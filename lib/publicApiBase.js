/**
 * Public API URL prefix for server and client (NEXT_PUBLIC_*).
 * @returns {string|null} e.g. "https://api.example.com/v1/" or null if env is missing.
 */
export function getPublicApiBase() {
  const base = process.env.NEXT_PUBLIC_API_URL?.trim();
  const end = process.env.NEXT_PUBLIC_END_POINT?.trim();
  return base && end ? `${base}${end}` : null;
}
