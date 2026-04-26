import styles from './TransportIcon.module.css';

type Props = {
  mode: 'standard' | 'express';
};

export function TransportIcon({ mode }: Props) {
  return (
    <span key={mode} className={styles.iconWrapper} aria-label={mode === 'standard' ? 'Truck delivery' : 'Air delivery'}>
      {mode === 'standard' ? <TruckIcon /> : <PlaneIcon />}
    </span>
  );
}

function TruckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={styles.svg}
    >
      <rect x="1" y="4.5" width="8" height="6.5" rx="0.5" />
      <path d="M9 6.5 L12.5 6.5 L15 9 L15 11 L9 11 Z" />
      <circle cx="4" cy="12.2" r="1.3" />
      <circle cx="12" cy="12.2" r="1.3" />
    </svg>
  );
}

function PlaneIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={styles.svg}
    >
      <path d="M14.5 1.5 L1.5 7 L5.5 8.5 L7 13 L9.5 9 L14.5 1.5 Z" />
      <path d="M5.5 8.5 L9.5 9" />
    </svg>
  );
}
