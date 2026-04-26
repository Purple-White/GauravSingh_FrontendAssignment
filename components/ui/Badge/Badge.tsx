import styles from './Badge.module.css';

type BadgeVariant = 'orderStamp' | 'standard' | 'express';

interface BadgeProps {
  variant: BadgeVariant;
  children: React.ReactNode;
}

export default function Badge({ variant, children }: BadgeProps) {
  const variantClass = {
    orderStamp: styles.orderStamp,
    standard: `${styles.deliveryType} ${styles.standard}`,
    express: `${styles.deliveryType} ${styles.express}`,
  }[variant];

  return (
    <span className={`${styles.badge} ${variantClass}`}>
      {children}
    </span>
  );
}
