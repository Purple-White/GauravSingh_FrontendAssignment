import dynamic from 'next/dynamic';
import OrderForm from '@/components/OrderForm/OrderForm';
import styles from './page.module.css';

const MobileManifestPill = dynamic(
  () => import('@/components/ui/MobileManifestPill/MobileManifestPill'),
  { ssr: false }
);

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.pageHeader}>
        <span className={styles.breadcrumb}>Logistics · Order Entry</span>
        <h1 className={styles.pageTitle}>New shipment order</h1>
        <p className={styles.pageSubtitle}>
          Fill the form on the left. The manifest on the right updates as you type.
        </p>
      </header>

      <div className={styles.contentGrid}>
        <OrderForm />
      </div>

      <MobileManifestPill />
    </div>
  );
}
