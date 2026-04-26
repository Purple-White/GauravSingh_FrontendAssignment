'use client';

import { useId } from 'react';
import styles from './NumberField.module.css';

interface NumberFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string | null;
  disabled?: boolean;
  prefix?: string;
  suffix?: string;
  min?: number;
  step?: number;
}

export default function NumberField({
  label,
  value,
  onChange,
  placeholder,
  error,
  disabled = false,
  prefix,
  suffix,
  min,
  step,
}: NumberFieldProps) {
  const id = useId();
  const hasPrefix = !!prefix;
  const hasSuffix = !!suffix;

  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <div
        className={`${styles.inputWrapper} ${hasPrefix ? styles.hasPrefix : ''} ${hasSuffix ? styles.hasSuffix : ''}`}
      >
        {hasPrefix && (
          <span className={styles.prefix} aria-hidden="true">
            {prefix}
          </span>
        )}
        <input
          id={id}
          type="number"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (['e', 'E', '+', '-'].includes(e.key)) e.preventDefault();
          }}
          placeholder={placeholder}
          disabled={disabled}
          min={min}
          step={step}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${styles.input} ${error ? styles.inputError : ''}`}
        />
        {hasSuffix && (
          <span className={styles.suffix} aria-hidden="true">
            {suffix}
          </span>
        )}
      </div>
      {error && (
        <span id={`${id}-error`} className={styles.errorText} role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
