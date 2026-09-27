/**
 * Formatting helpers for SQL query results. Numeric SQL types (DECIMAL,
 * large BIGINT, AVG/SUM results) can arrive as strings at runtime, so every
 * helper coerces with Number() before formatting.
 */

export const toNumber = (value: number | string | null | undefined): number =>
  value == null ? 0 : Number(value);

/** Whole-number count with thousands separators, e.g. 21932 → "21,932". */
export const formatCount = (value: number | string): string =>
  toNumber(value).toLocaleString('en-US');

/** USD currency, e.g. 12.35 → "$12.35". */
export const formatCurrency = (
  value: number | string,
  fractionDigits = 2
): string =>
  `$${toNumber(value).toLocaleString('en-US', {
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  })}`;

/** Miles with one decimal, e.g. 2.85 → "2.9 mi". */
export const formatMiles = (value: number | string): string =>
  `${toNumber(value).toFixed(1)} mi`;

/** Minutes with one decimal, e.g. 14.6 → "14.6 min". */
export const formatMinutes = (value: number | string): string =>
  `${toNumber(value).toFixed(1)} min`;

/** ISO date string (YYYY-MM-DD) → "Jan 5" style short label. */
export const formatShortDate = (value: string): string => {
  const d = new Date(value);
  return Number.isNaN(d.getTime())
    ? value
    : d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};
