import type { Package, ComputedTotals } from '@/types/order';

export function computeTotals(packages: Package[]): ComputedTotals {
  let totalWeight = 0;
  let totalVolumetric = 0;
  let totalDeclaredValue = 0;

  for (const pkg of packages) {
    const w = parseFloat(pkg.weight);
    const l = parseFloat(pkg.length);
    const wd = parseFloat(pkg.width);
    const h = parseFloat(pkg.height);
    const v = parseFloat(pkg.declaredValue);
    if (!isNaN(w)) totalWeight += w;
    if (!isNaN(l) && !isNaN(wd) && !isNaN(h)) totalVolumetric += (l * wd * h) / 5000;
    if (!isNaN(v)) totalDeclaredValue += v;
  }

  const chargeable = Math.max(totalWeight, totalVolumetric);

  return {
    packageCount: packages.length,
    totalWeight: Math.round(totalWeight * 100) / 100,
    totalVolumetric: Math.round(totalVolumetric * 100) / 100,
    chargeable: Math.round(chargeable * 100) / 100,
    totalDeclaredValue: Math.round(totalDeclaredValue * 100) / 100,
  };
}
