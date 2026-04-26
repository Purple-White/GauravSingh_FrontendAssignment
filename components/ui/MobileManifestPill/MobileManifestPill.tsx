'use client';

import styles from './MobileManifestPill.module.css';

function ArrowDownIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M7 2v10M2.5 8l4.5 4.5L11.5 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function MobileManifestPill() {
  const handleClick = () => {
    document
      .getElementById('manifest-preview')
      ?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={styles.pill}
      aria-label="Scroll to shipment manifest"
    >
      <ArrowDownIcon />
      <span>View manifest</span>
    </button>
  );
}
