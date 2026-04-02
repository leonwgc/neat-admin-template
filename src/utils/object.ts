/**
 * @file utils/object.ts
 * @author leon.wang
 */

/**
 * Pick specified keys from an object
 */
export const pick = <T extends object, K extends keyof T>(obj: T, keys: K[]): Pick<T, K> => {
  return keys.reduce((acc, key) => {
    if (key in obj) {
      acc[key] = obj[key];
    }
    return acc;
  }, {} as Pick<T, K>);
};

/**
 * Omit specified keys from an object
 */
export const omit = <T extends object, K extends keyof T>(obj: T, keys: K[]): Omit<T, K> => {
  const result = { ...obj };
  keys.forEach((key) => delete result[key]);
  return result as Omit<T, K>;
};

/**
 * Deep clone an object.
 * Uses native structuredClone when available (supports Date, Map, Set, RegExp, etc.),
 * falls back to a manual recursive implementation for older environments.
 */
export const deepClone = <T>(obj: T): T => {
  if (typeof structuredClone === 'function') {
    return structuredClone(obj);
  }
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj.getTime()) as unknown as T;
  if (Array.isArray(obj)) return obj.map((item) => deepClone(item)) as unknown as T;
  return Object.fromEntries(
    Object.entries(obj as object).map(([k, v]) => [k, deepClone(v)])
  ) as T;
};

/**
 * Deep merge source into target (mutates target), arrays are replaced not merged
 */
export const deepMerge = <T extends object>(target: T, source: Partial<T>): T => {
  for (const key in source) {
    const srcVal = source[key];
    const tgtVal = target[key];
    if (
      srcVal !== null &&
      typeof srcVal === 'object' &&
      !Array.isArray(srcVal) &&
      tgtVal !== null &&
      typeof tgtVal === 'object' &&
      !Array.isArray(tgtVal)
    ) {
      deepMerge(tgtVal as object, srcVal as object);
    } else if (srcVal !== undefined) {
      (target as Record<string, unknown>)[key] = deepClone(srcVal);
    }
  }
  return target;
};

/**
 * Flatten a nested object into a single-level object with dot-separated keys
 * @example flattenObject({ a: { b: 1 } }) => { 'a.b': 1 }
 */
export const flattenObject = (
  obj: object,
  prefix = '',
  result: Record<string, unknown> = {}
): Record<string, unknown> => {
  for (const [key, value] of Object.entries(obj)) {
    const fullKey = prefix ? `${prefix}.${key}` : key;
    if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      flattenObject(value, fullKey, result);
    } else {
      result[fullKey] = value;
    }
  }
  return result;
};

/**
 * Unflatten a dot-separated key object back into a nested object
 * @example unflattenObject({ 'a.b': 1 }) => { a: { b: 1 } }
 */
export const unflattenObject = (obj: Record<string, unknown>): Record<string, unknown> => {
  const result: Record<string, unknown> = {};
  for (const [flatKey, value] of Object.entries(obj)) {
    const keys = flatKey.split('.');
    let current: Record<string, unknown> = result;
    keys.forEach((k, i) => {
      if (i === keys.length - 1) {
        current[k] = value;
      } else {
        if (current[k] === undefined || typeof current[k] !== 'object') {
          current[k] = {};
        }
        current = current[k] as Record<string, unknown>;
      }
    });
  }
  return result;
};

/**
 * Remove keys with null or undefined values from an object (shallow)
 */
export const compact = <T extends object>(obj: T): Partial<T> => {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v !== null && v !== undefined)
  ) as Partial<T>;
};

/**
 * Check if two objects are shallowly equal
 */
export const shallowEqual = (a: object, b: object): boolean => {
  if (a === b) return true;
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  return keysA.every((key) => (a as Record<string, unknown>)[key] === (b as Record<string, unknown>)[key]);
};

/**
 * Check if an object is empty (no own enumerable properties)
 */
export const isEmpty = (obj: object): boolean => Object.keys(obj).length === 0;
