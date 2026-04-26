'use client';

import { useId } from 'react';
import styles from './Checkbox.module.css';

interface CheckboxProps {
  label: string;
  sublabel?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function Checkbox({
  label,
  sublabel,
  checked,
  onChange,
}: CheckboxProps) {
  const id = useId();

  return (
    <label htmlFor={id} className={styles.wrapper}>
      {/* Visually hidden native input for keyboard + screen reader */}
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className={styles.hiddenInput}
        aria-label={label}
      />
      {/* Custom visual box */}
      <span className={`${styles.box} ${checked ? styles.boxChecked : ''}`} aria-hidden="true">
        {checked && (
          <svg
            className={styles.checkmark}
            viewBox="0 0 10 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 4L3.5 6.5L9 1"
              stroke="#FAFAF7"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
      <span className={styles.textGroup}>
        <span className={styles.labelText}>{label}</span>
        {sublabel && <span className={styles.sublabel}>{sublabel}</span>}
      </span>
    </label>
  );
}
