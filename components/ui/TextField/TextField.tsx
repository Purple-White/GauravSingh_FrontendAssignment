'use client';

import { useId } from 'react';
import styles from './TextField.module.css';

interface TextFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
  placeholder?: string;
  error?: string | null;
  disabled?: boolean;
  autoComplete?: string;
  type?: 'text' | 'date' | 'email' | 'tel' | 'url';
  inputMode?: 'text' | 'numeric' | 'decimal' | 'email' | 'tel' | 'url';
  maxLength?: number;
  mono?: boolean;
}

export default function TextField({
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  disabled = false,
  autoComplete,
  type = 'text',
  inputMode,
  maxLength,
  mono = false,
}: TextFieldProps) {
  const id = useId();

  return (
    <div className={styles.field}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <div className={styles.inputWrapper}>
        <input
          id={id}
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
          inputMode={inputMode}
          maxLength={maxLength}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={`${styles.input} ${error ? styles.inputError : ''} ${mono ? styles.monoInput : ''}`}
        />
      </div>
      {error && (
        <span id={`${id}-error`} className={styles.errorText} role="alert">
          {error}
        </span>
      )}
    </div>
  );
}
