import styles from './Chip.module.css';

type ChipVariant = 'fragile' | 'insured' | 'inactive';

interface ChipProps {
  variant: ChipVariant;
  label: string;
}

function FragileIcon() {
  return (
    <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M6 1.5L1 10.5H11L6 1.5Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path d="M6 5V7.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="6" cy="9" r="0.5" fill="currentColor" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M6 1L2 2.5V6C2 8.5 4 10.5 6 11C8 10.5 10 8.5 10 6V2.5L6 1Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M4.5 6L5.5 7L7.5 5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function CircleIcon() {
  return (
    <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <circle cx="6" cy="6" r="4.5" stroke="currentColor" strokeWidth="1.2" />
    </svg>
  );
}

export default function Chip({ variant, label }: ChipProps) {
  const variantClass = {
    fragile: styles.fragile,
    insured: styles.insured,
    inactive: styles.inactive,
  }[variant];

  const showIcon = variant !== 'inactive';

  return (
    <span className={`${styles.chip} ${variantClass}`}>
      {showIcon && (
        <span className={styles.chipIcon}>
          {variant === 'fragile' && <FragileIcon />}
          {variant === 'insured' && <ShieldIcon />}
        </span>
      )}
      {variant === 'inactive' && (
        <span className={styles.chipIcon}>
          <CircleIcon />
        </span>
      )}
      {label}
    </span>
  );
}
