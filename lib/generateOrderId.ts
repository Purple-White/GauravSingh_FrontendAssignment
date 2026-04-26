/**
 * Generates a stable order ID in the format LV-YYYY-XXXXXX
 * where XXXXXX is 6 uppercase alphanumeric characters.
 * Called once via lazy useState initializer — never regenerated.
 */
export function generateOrderId(): string {
  const year = new Date().getFullYear();
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let suffix = '';
  // Use crypto for randomness where available, fallback to Math.random
  if (typeof crypto !== 'undefined' && crypto.getRandomValues) {
    const arr = new Uint8Array(6);
    crypto.getRandomValues(arr);
    for (let i = 0; i < arr.length; i++) {
      suffix += chars[arr[i] % chars.length];
    }
  } else {
    for (let i = 0; i < 6; i++) {
      suffix += chars[Math.floor(Math.random() * chars.length)];
    }
  }
  return `LV-${year}-${suffix}`;
}
