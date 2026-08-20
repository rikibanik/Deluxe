/**
 * Parse duration strings like 168h, 30m, 7d into milliseconds.
 * @param {string} ttl
 * @returns {number}
 */
export function parseTtl(ttl) {
  const match = ttl.match(/^(\d+)([smhd])$/);
  if (!match) {
    return 7 * 24 * 60 * 60 * 1000;
  }

  const value = Number(match[1]);
  const unit = match[2];
  const multipliers = { s: 1000, m: 60_000, h: 3_600_000, d: 86_400_000 };
  return value * multipliers[unit];
}
