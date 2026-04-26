'use client';

import { useState } from 'react';
import SectionCard from '@/components/ui/SectionCard/SectionCard';
import TextField from '@/components/ui/TextField/TextField';
import Textarea from '@/components/ui/Textarea/Textarea';
import { validatePincode } from '@/lib/validators';
import type { Address } from '@/types/order';
import styles from './AddressSection.module.css';

function ArrowUpRight() {
  return (
    <div className={styles.iconCircle}>
      <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M5.5 14.5L14.5 5.5M14.5 5.5H8M14.5 5.5V12" stroke="#DC5F2C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

function ArrowDownLeft() {
  return (
    <div className={styles.iconCircle}>
      <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M14.5 5.5L5.5 14.5M5.5 14.5H12M5.5 14.5V8" stroke="#DC5F2C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

interface AddressSectionProps {
  sectionNumber: string;
  role: 'consignor' | 'consignee';
  address: Address;
  onChange: (updated: Address) => void;
}

export default function AddressSection({
  sectionNumber,
  role,
  address,
  onChange,
}: AddressSectionProps) {
  const isConsignor = role === 'consignor';
  const [pincodeError, setPincodeError] = useState<string | null>(null);

  const update = (field: keyof Address) => (value: string) => {
    onChange({ ...address, [field]: value });
  };

  const handlePincodeChange = (value: string) => {
    // Strip non-digits and cap at 6 chars
    const digits = value.replace(/\D/g, '').slice(0, 6);
    onChange({ ...address, pincode: digits });
    if (pincodeError && digits.length < 6) setPincodeError(null);
  };

  const handlePincodeBlur = () => {
    setPincodeError(validatePincode(address.pincode));
  };

  return (
    <SectionCard
      eyebrow={`${sectionNumber} — ${isConsignor ? 'Consignor' : 'Consignee'}`}
      title={isConsignor ? 'Sender details' : 'Receiver details'}
      action={isConsignor ? <ArrowUpRight /> : <ArrowDownLeft />}
    >
      <div className={styles.formGrid}>
        <div className={styles.fullWidth}>
          <TextField
            label="Name"
            value={address.name}
            onChange={update('name')}
            placeholder={isConsignor ? 'Sender full name' : 'Receiver full name'}
            autoComplete={isConsignor ? 'name' : 'off'}
          />
        </div>

        <div className={styles.fullWidth}>
          <Textarea
            label="Address"
            value={address.address}
            onChange={update('address')}
            placeholder="Street, area, landmark"
            rows={2}
          />
        </div>

        <div className={styles.halfWidth}>
          <TextField
            label="City"
            value={address.city}
            onChange={update('city')}
            placeholder="City"
            autoComplete={isConsignor ? 'address-level2' : 'off'}
          />
        </div>

        <div className={styles.halfWidth}>
          <TextField
            label="Pincode"
            value={address.pincode}
            onChange={handlePincodeChange}
            onBlur={handlePincodeBlur}
            placeholder="560001"
            inputMode="numeric"
            maxLength={6}
            error={pincodeError}
            mono
            autoComplete={isConsignor ? 'postal-code' : 'off'}
          />
        </div>
      </div>
    </SectionCard>
  );
}
