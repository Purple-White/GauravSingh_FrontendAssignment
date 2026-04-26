import Badge from '@/components/ui/Badge/Badge';
import Barcode from '@/components/ui/Barcode/Barcode';
import Chip from '@/components/ui/Chip/Chip';
import { TransportIcon } from '@/components/ui/TransportIcon/TransportIcon';
import { isFormEmpty } from '@/lib/isFormEmpty';
import type { Address, Package, DeliveryType, ComputedTotals } from '@/types/order';
import styles from './ShipmentPreview.module.css';

interface ShipmentPreviewProps {
  orderId: string;
  date: string;
  deliveryType: DeliveryType;
  consignor: Address;
  consignee: Address;
  packages: Package[];
  fragile: boolean;
  insured: boolean;
  totals: ComputedTotals;
}

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

function formatDate(iso: string): string {
  if (!iso) return '—';
  const parts = iso.split('-');
  if (parts.length !== 3) return iso;
  const [year, month, day] = parts.map(Number);
  if (!year || !month || !day) return iso;
  return `${day} ${MONTHS[month - 1]} ${year}`;
}

function formatDims(pkg: Package): string {
  const hasDims = pkg.length || pkg.width || pkg.height;
  const hasWeight = !!pkg.weight;
  const parts: string[] = [];
  if (hasDims) {
    parts.push(`${pkg.length || '—'} × ${pkg.width || '—'} × ${pkg.height || '—'} cm`);
  }
  if (hasWeight) parts.push(`${parseFloat(pkg.weight).toFixed(2)} kg`);
  return parts.join(' · ');
}

const isAddrEmpty = (addr: Address) =>
  !addr.name.trim() && !addr.address.trim() && !addr.city.trim() && !addr.pincode.trim();

function hasAnyPackageData(packages: Package[]): boolean {
  return packages.some(
    (p) =>
      p.label.trim() !== '' ||
      parseFloat(p.weight) > 0 ||
      parseFloat(p.length) > 0 ||
      parseFloat(p.width) > 0 ||
      parseFloat(p.height) > 0 ||
      parseFloat(p.declaredValue) > 0
  );
}

function IsometricBoxIcon() {
  return (
    <svg
      className={styles.emptyBoxIcon}
      width="64"
      height="64"
      viewBox="0 0 64 64"
      fill="none"
      strokeLinejoin="round"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M32 8 L56 18 L32 28 L8 18 Z" />
      <path d="M8 18 L8 46 L32 56 L32 28" />
      <path d="M32 28 L32 56 L56 46 L56 18" />
      <path d="M20 13 L44 23" strokeDasharray="2 3" opacity="0.6" />
    </svg>
  );
}

function SmallBoxIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="4" y="11" width="24" height="17" rx="2" stroke="#D4D2CB" strokeWidth="1.5"/>
      <path d="M4 15H28" stroke="#D4D2CB" strokeWidth="1.5"/>
      <path d="M13 4H19L21 11H11L13 4Z" stroke="#D4D2CB" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M13 15V20H19V15" stroke="#D4D2CB" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  );
}

function PerforatedEdge() {
  return (
    <svg
      className={styles.perforatedEdge}
      height="16"
      viewBox="0 0 432 16"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <line
        x1="0" y1="8" x2="432" y2="8"
        stroke="#E7E5DF"
        strokeWidth="1.5"
        strokeDasharray="6 4"
      />
    </svg>
  );
}

function AddressBlock({ role, addr }: { role: 'From' | 'To'; addr: Address }) {
  const empty = isAddrEmpty(addr);
  return (
    <div className={styles.addressBlock}>
      <span className={styles.addressRole}>{role}</span>
      {empty ? (
        <p className={styles.addressEmpty}>
          {role === 'From' ? 'Sender details will appear here' : 'Receiver details will appear here'}
        </p>
      ) : (
        <>
          <p className={styles.addressName}>{addr.name || '—'}</p>
          {addr.address && (
            <p className={styles.addressLine}>{addr.address}</p>
          )}
          {(addr.city || addr.pincode) && (
            <p className={styles.addressLine}>
              {addr.city}
              {addr.city && addr.pincode && (
                <span className={styles.addressSep}> — </span>
              )}
              {addr.pincode && (
                <span className={styles.addressPincode}>{addr.pincode}</span>
              )}
            </p>
          )}
        </>
      )}
    </div>
  );
}

export default function ShipmentPreview({
  orderId,
  date,
  deliveryType,
  consignor,
  consignee,
  packages,
  fragile,
  insured,
  totals,
}: ShipmentPreviewProps) {
  const empty = isFormEmpty(consignor, consignee, packages, fragile, insured);
  const hasPackageData = hasAnyPackageData(packages);

  return (
    <aside
      className={styles.preview}
      aria-label="Shipment manifest preview"
      id="manifest-preview"
    >
      <PerforatedEdge />

      {empty ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyMain}>
            <IsometricBoxIcon />
            <div className={styles.emptyTextGroup}>
              <p className={styles.emptyTitle}>Start filling the form</p>
              <p className={styles.emptySubtitle}>
                Your shipment manifest will appear here as you type.
              </p>
            </div>
          </div>
          <span className={styles.emptyAwaitingLabel}>Awaiting details</span>
        </div>
      ) : (
        <div className={styles.inner}>
          <div className={styles.header}>
            <div className={styles.headerLeft}>
              <span className={styles.manifestLabel}>Shipment Manifest</span>
              <span className={styles.orderId}>{orderId}</span>
            </div>
            <div className={styles.headerRight}>
              <Badge variant={deliveryType}>
                {deliveryType === 'standard' ? 'Standard' : 'Express'}
              </Badge>
              <p className={styles.dateText}>{formatDate(date)}</p>
            </div>
          </div>

          <div className={styles.divider} />

          <AddressBlock role="From" addr={consignor} />

          <div className={styles.connectorWrapper} aria-hidden="true">
            <div className={styles.connectorLine} />
            <div className={styles.connectorDot}>
              <TransportIcon mode={deliveryType} />
            </div>
          </div>

          <AddressBlock role="To" addr={consignee} />

          <div className={styles.divider} />

          <div className={styles.packagesSection}>
            <span className={styles.sectionLabel}>
              Packages ({totals.packageCount})
            </span>
            {!hasPackageData ? (
              <div className={styles.packagesEmpty}>
                <SmallBoxIcon />
                <span>No packages added yet</span>
              </div>
            ) : (
              packages.map((pkg) => {
                const dims = formatDims(pkg);
                const value = pkg.declaredValue
                  ? `₹${parseFloat(pkg.declaredValue).toLocaleString('en-IN')}`
                  : null;
                return (
                  <div key={pkg.id} className={styles.packageRow}>
                    <div className={styles.packageLeft}>
                      <p className={styles.packageName}>
                        {pkg.label || <span className={styles.packageNameEmpty}>Untitled package</span>}
                      </p>
                      {value && <p className={styles.packageMeta}>{value}</p>}
                    </div>
                    {dims && (
                      <div className={styles.packageRight}>
                        <p className={styles.packageDimWeight}>{dims}</p>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>

          <div className={styles.indicatorsSection}>
            <span className={styles.sectionLabel}>Indicators</span>
            <div className={styles.indicators}>
              <Chip
                variant={fragile ? 'fragile' : 'inactive'}
                label={fragile ? 'Fragile' : 'Not fragile'}
              />
              <Chip
                variant={insured ? 'insured' : 'inactive'}
                label={insured ? 'Insured' : 'Uninsured'}
              />
            </div>
          </div>

          <div className={styles.totalsBar}>
            <div className={styles.totalRow}>
              <span className={styles.totalLabel}>Packages</span>
              <span className={styles.totalValue} key={`pkgs-${totals.packageCount}`}>
                {String(totals.packageCount).padStart(2, '0')}
              </span>
            </div>
            <div className={styles.totalRow}>
              <span className={styles.totalLabel}>Total Weight</span>
              <span className={styles.totalValue} key={`wt-${totals.totalWeight}`}>
                {totals.totalWeight.toFixed(2)}
                <span className={styles.totalUnit}>kg</span>
              </span>
            </div>
            <div className={styles.totalRow}>
              <span className={styles.totalLabel}>Volumetric</span>
              <span className={styles.totalValue} key={`vol-${totals.totalVolumetric}`}>
                {totals.totalVolumetric.toFixed(2)}
                <span className={styles.totalUnit}>kg</span>
              </span>
            </div>
            <div className={hasPackageData ? styles.totalRowChargeable : styles.totalRow}>
              <span className={hasPackageData ? styles.totalLabelChargeable : styles.totalLabel}>
                {hasPackageData ? (
                  <>
                    Chargeable
                    <span className={styles.totalFootnote}>Higher of actual or volumetric (L×W×H÷5000)</span>
                  </>
                ) : 'Chargeable'}
              </span>
              <span
                className={hasPackageData ? styles.totalValueChargeable : styles.totalValue}
                key={`chg-${totals.chargeable}`}
              >
                {totals.chargeable.toFixed(2)}
                <span className={hasPackageData ? styles.totalUnitChargeable : styles.totalUnit}>kg</span>
              </span>
            </div>
            <div className={styles.totalRow}>
              <span className={styles.totalLabel}>Declared</span>
              <span className={styles.totalValue} key={`val-${totals.totalDeclaredValue}`}>
                ₹{totals.totalDeclaredValue.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <div className={styles.barcodeSection}>
            <Barcode value={orderId} />
            <span className={styles.barcodeLabel}>{orderId}</span>
          </div>

          <div className={styles.manifestFooter}>
            End of Manifest · {orderId}
          </div>
        </div>
      )}
    </aside>
  );
}
