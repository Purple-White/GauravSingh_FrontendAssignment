import { useId } from 'react';
import SectionCard from '@/components/ui/SectionCard/SectionCard';
import Badge from '@/components/ui/Badge/Badge';
import SegmentedControl from '@/components/ui/SegmentedControl/SegmentedControl';
import type { DeliveryType } from '@/types/order';
import styles from './ShipmentSection.module.css';

interface ShipmentSectionProps {
  orderId: string;
  date: string;
  deliveryType: DeliveryType;
  onDateChange: (v: string) => void;
  onDeliveryTypeChange: (v: DeliveryType) => void;
}

const DELIVERY_SEGMENTS = [
  { value: 'standard' as const, label: 'Standard' },
  { value: 'express' as const, label: 'Express' },
];

function CalendarIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="2" y="3" width="12" height="11" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M5 1.5V4M11 1.5V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M2 6.5H14" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

interface DateFieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
}

function DateField({ label, value, onChange }: DateFieldProps) {
  const id = useId();
  return (
    <div className={styles.dateField}>
      <label htmlFor={id} className={styles.labelBlock}>
        {label}
      </label>
      <div className={styles.dateInputWrapper}>
        <input
          id={id}
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={styles.dateInput}
          autoComplete="off"
        />
        <span className={styles.calendarIcon} aria-hidden="true">
          <CalendarIcon />
        </span>
      </div>
    </div>
  );
}

export default function ShipmentSection({
  orderId,
  date,
  deliveryType,
  onDateChange,
  onDeliveryTypeChange,
}: ShipmentSectionProps) {
  return (
    <SectionCard eyebrow="01 — Shipment" title="Order details">
      <div className={styles.grid}>
        <div className={styles.orderIdField}>
          <span className={styles.label}>Order ID</span>
          <Badge variant="orderStamp">{orderId}</Badge>
        </div>

        <DateField
          label="Shipment Date"
          value={date}
          onChange={onDateChange}
        />

        <div>
          <span className={styles.labelBlock}>Delivery Type</span>
          <SegmentedControl
            segments={DELIVERY_SEGMENTS}
            value={deliveryType}
            onChange={onDeliveryTypeChange}
            label="Delivery Type"
          />
        </div>
      </div>
    </SectionCard>
  );
}
