export interface Address {
  name: string;
  address: string;
  city: string;
  pincode: string;
}

export interface Package {
  id: string; // crypto.randomUUID() — never array index
  label: string;
  weight: string;
  length: string;
  width: string;
  height: string;
  declaredValue: string;
}

export type DeliveryType = 'standard' | 'express';

export interface FormState {
  date: string;
  deliveryType: DeliveryType;
  consignor: Address;
  consignee: Address;
  packages: Package[];
  fragile: boolean;
  insured: boolean;
}

export interface ComputedTotals {
  packageCount: number;
  totalWeight: number;
  totalVolumetric: number;
  chargeable: number;
  totalDeclaredValue: number;
}
