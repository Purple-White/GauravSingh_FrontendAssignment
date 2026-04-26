export function validatePincode(value: string): string | null {
  if (!value) return null;
  if (!/^\d{6}$/.test(value)) return 'Pincode must be 6 digits';
  return null;
}

export function validatePositiveNumber(value: string): string | null {
  if (!value) return null;
  const n = parseFloat(value);
  if (isNaN(n) || n <= 0) return 'Must be a positive number';
  return null;
}

export function validateRequired(value: string, label: string): string | null {
  if (!value.trim()) return `${label} is required`;
  return null;
}
