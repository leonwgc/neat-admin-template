/**
 * @file utils/string.ts
 * @author leon.wang
 */

/**
 * Truncate a string to a maximum length and append a suffix.
 * @param str Source string
 * @param maxLength Maximum character length
 * @param suffix Characters appended when truncated (default: '...')
 */
export const truncate = (str: string, maxLength: number, suffix = '...'): string => {
  if (!str || str.length <= maxLength) return str;
  return str.slice(0, maxLength) + suffix;
};

/**
 * Convert camelCase / PascalCase to snake_case
 * e.g. "myVariableName" → "my_variable_name"
 */
export const camelToSnake = (str: string): string => {
  return str.replace(/([A-Z])/g, (char) => `_${char.toLowerCase()}`).replace(/^_/, '');
};

/**
 * Convert snake_case to camelCase
 * e.g. "my_variable_name" → "myVariableName"
 */
export const snakeToCamel = (str: string): string => {
  return str.replace(/_([a-z])/g, (_, char) => char.toUpperCase());
};

/**
 * Capitalize the first character of a string
 * e.g. "hello world" → "Hello world"
 */
export const capitalize = (str: string): string => {
  if (!str) return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Mask a credit card number, keeping only the last 4 digits
 * e.g. "4111111111111111" → "**** **** **** 1111"
 */
export const maskCardNumber = (card: string): string => {
  const digits = card.replace(/\D/g, '');
  if (digits.length < 4) return card;
  return `**** **** **** ${digits.slice(-4)}`;
};

/**
 * Mask a Chinese ID card number
 * e.g. "110101199001011234" → "11010119****1234"
 */
export const maskIdCard = (id: string): string => {
  if (!id || id.length < 8) return id;
  return `${id.slice(0, 8)}****${id.slice(-4)}`;
};

/**
 * Format a number with thousand separators
 * e.g. 1234567.89 → "1,234,567.89"
 */
export const formatNumber = (num: number, decimals?: number): string => {
  const value = decimals !== undefined ? num.toFixed(decimals) : String(num);
  const [integer, decimal] = value.split('.');
  const formatted = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return decimal !== undefined ? `${formatted}.${decimal}` : formatted;
};

/**
 * Check if a string is empty, null, or only whitespace
 */
export const isBlank = (str?: string | null): boolean => {
  return !str || str.trim().length === 0;
};

/**
 * Remove all HTML tags from a string
 * e.g. "<p>Hello <b>World</b></p>" → "Hello World"
 */
export const stripHtml = (html: string): string => {
  return html.replace(/<[^>]*>/g, '');
};

/**
 * Generate a random alphanumeric string of the given length
 */
export const randomString = (length = 8): string => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  return Array.from({ length }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
};

/**
 * Highlight occurrences of a keyword inside a text by wrapping them with <mark>.
 * e.g. highlight("hello world", "world") → 'hello <mark>world</mark>'
 */
export const highlight = (text: string, keyword: string): string => {
  if (!keyword) return text;
  const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return text.replace(new RegExp(escaped, 'gi'), (match) => `<mark>${match}</mark>`);
};
