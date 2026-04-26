'use client';

import styles from './Button.module.css';

type ButtonVariant = 'primary' | 'ghost' | 'ghostDashed' | 'iconGhost';

interface ButtonProps {
  variant?: ButtonVariant;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  children: React.ReactNode;
  disabled?: boolean;
  ariaLabel?: string;
}

export default function Button({
  variant = 'primary',
  onClick,
  type = 'button',
  children,
  disabled = false,
  ariaLabel,
}: ButtonProps) {
  const variantClass = {
    primary: styles.primary,
    ghost: styles.ghost,
    ghostDashed: styles.ghostDashed,
    iconGhost: styles.iconGhost,
  }[variant];

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`${styles.btn} ${variantClass}`}
    >
      {children}
    </button>
  );
}
