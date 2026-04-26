'use client';

import { useState, useMemo, useEffect } from 'react';
import { generateOrderId } from '@/lib/generateOrderId';
import { computeTotals } from '@/lib/computeTotals';
import ShipmentSection from '@/components/sections/ShipmentSection/ShipmentSection';
import AddressSection from '@/components/sections/AddressSection/AddressSection';
import PackagesSection from '@/components/sections/PackagesSection/PackagesSection';
import OptionsSection from '@/components/sections/OptionsSection/OptionsSection';
import ShipmentPreview from '@/components/ShipmentPreview/ShipmentPreview';
import Button from '@/components/ui/Button/Button';
import type { FormState, Address, Package, DeliveryType } from '@/types/order';
import styles from './OrderForm.module.css';

const today = new Date().toISOString().slice(0, 10);

const EMPTY_ADDRESS: Address = {
  name: '',
  address: '',
  city: '',
  pincode: '',
};

function createEmptyPackage(): Package {
  return {
    id: crypto.randomUUID(),
    label: '',
    weight: '',
    length: '',
    width: '',
    height: '',
    declaredValue: '',
  };
}

export default function OrderForm() {
  const [orderId, setOrderId] = useState('');
  useEffect(() => {
    setOrderId(generateOrderId());
  }, []);

  const [form, setForm] = useState<FormState>({
    date: today,
    deliveryType: 'standard',
    consignor: { ...EMPTY_ADDRESS },
    consignee: { ...EMPTY_ADDRESS },
    packages: [createEmptyPackage()],
    fragile: false,
    insured: false,
  });

  const totals = useMemo(() => computeTotals(form.packages), [form.packages]);

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleConsignorChange = (updated: Address) => setField('consignor', updated);
  const handleConsigneeChange = (updated: Address) => setField('consignee', updated);

  const handleAddPackage = () => {
    setForm((prev) => ({
      ...prev,
      packages: [...prev.packages, createEmptyPackage()],
    }));
  };

  const handleRemovePackage = (id: string) => {
    setForm((prev) => ({
      ...prev,
      packages: prev.packages.filter((p) => p.id !== id),
    }));
  };

  const handleUpdatePackage = (
    id: string,
    field: keyof Omit<Package, 'id'>,
    value: string
  ) => {
    setForm((prev) => ({
      ...prev,
      packages: prev.packages.map((p) =>
        p.id === id ? { ...p, [field]: value } : p
      ),
    }));
  };

  const handleReset = () => {
    setOrderId(generateOrderId());
    setForm({
      date: today,
      deliveryType: 'standard',
      consignor: { ...EMPTY_ADDRESS },
      consignee: { ...EMPTY_ADDRESS },
      packages: [createEmptyPackage()],
      fragile: false,
      insured: false,
    });
  };

  return (
    <>
      <div className={styles.form} id="order-form">
        <ShipmentSection
          orderId={orderId}
          date={form.date}
          minDate={today}
          deliveryType={form.deliveryType}
          onDateChange={(v) => setField('date', v)}
          onDeliveryTypeChange={(v: DeliveryType) => setField('deliveryType', v)}
        />

        <AddressSection
          sectionNumber="02"
          role="consignor"
          address={form.consignor}
          onChange={handleConsignorChange}
        />

        <AddressSection
          sectionNumber="03"
          role="consignee"
          address={form.consignee}
          onChange={handleConsigneeChange}
        />

        <PackagesSection
          packages={form.packages}
          onAdd={handleAddPackage}
          onRemove={handleRemovePackage}
          onUpdate={handleUpdatePackage}
        />

        <OptionsSection
          fragile={form.fragile}
          insured={form.insured}
          onFragileChange={(v) => setField('fragile', v)}
          onInsuredChange={(v) => setField('insured', v)}
        />

        <div className={styles.formActions}>
          <Button variant="ghost" onClick={handleReset}>
            New order
          </Button>
        </div>
      </div>

      <ShipmentPreview
        orderId={orderId}
        date={form.date}
        deliveryType={form.deliveryType}
        consignor={form.consignor}
        consignee={form.consignee}
        packages={form.packages}
        fragile={form.fragile}
        insured={form.insured}
        totals={totals}
      />
    </>
  );
}
