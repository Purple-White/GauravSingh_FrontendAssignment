'use client';

import type { KeyboardEvent } from 'react';
import styles from './SegmentedControl.module.css';

interface Segment<T extends string> {
  value: T;
  label: string;
}

interface SegmentedControlProps<T extends string> {
  segments: Segment<T>[];
  value: T;
  onChange: (value: T) => void;
  label: string;
}

export default function SegmentedControl<T extends string>({
  segments,
  value,
  onChange,
  label,
}: SegmentedControlProps<T>) {
  const currentIndex = segments.findIndex((s) => s.value === value);

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      const next = segments[(currentIndex + 1) % segments.length];
      onChange(next.value);
    }
    if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = segments[(currentIndex - 1 + segments.length) % segments.length];
      onChange(prev.value);
    }
  };

  return (
    <div
      className={styles.control}
      role="radiogroup"
      aria-label={label}
      onKeyDown={handleKeyDown}
    >
      {segments.map((seg) => {
        const isActive = seg.value === value;
        return (
          <button
            key={seg.value}
            type="button"
            role="radio"
            aria-checked={isActive}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onChange(seg.value)}
            className={`${styles.segment} ${isActive ? styles.segmentActive : ''}`}
          >
            {seg.label}
          </button>
        );
      })}
    </div>
  );
}
