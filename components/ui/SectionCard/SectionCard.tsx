import styles from './SectionCard.module.css';

interface SectionCardProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}

export default function SectionCard({
  eyebrow,
  title,
  subtitle,
  children,
  action,
}: SectionCardProps) {
  return (
    <section className={styles.card} aria-label={title}>
      <div className={styles.header}>
        <div className={styles.headerLeft}>
          <span className={styles.eyebrow}>{eyebrow}</span>
          <span className={styles.title}>{title}</span>
          {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
        </div>
        {action && <div className={styles.headerAction}>{action}</div>}
      </div>
      <div className={styles.content}>{children}</div>
    </section>
  );
}
