import type { Address, Package } from '@/types/order';

function isAddressEmpty(a: Address): boolean {
  return !a.name.trim() && !a.address.trim() && !a.city.trim() && !a.pincode.trim();
}

function isPackageEmpty(p: Package): boolean {
  return (
    !p.label.trim() &&
    !p.weight &&
    !p.length &&
    !p.width &&
    !p.height &&
    !p.declaredValue
  );
}

export function isFormEmpty(
  consignor: Address,
  consignee: Address,
  packages: Package[],
  fragile: boolean,
  insured: boolean
): boolean {
  const packagesEmpty =
    packages.length === 0 || packages.every(isPackageEmpty);
  return (
    isAddressEmpty(consignor) &&
    isAddressEmpty(consignee) &&
    packagesEmpty &&
    !fragile &&
    !insured
  );
}
