'use client';

import SectionCard from '@/components/ui/SectionCard/SectionCard';
import TextField from '@/components/ui/TextField/TextField';
import NumberField from '@/components/ui/NumberField/NumberField';
import Button from '@/components/ui/Button/Button';
import type { Package } from '@/types/order';
import styles from './PackagesSection.module.css';

interface PackagesSectionProps {
  packages: Package[];
  onAdd: () => void;
  onRemove: (id: string) => void;
  onUpdate: (id: string, field: keyof Omit<Package, 'id'>, value: string) => void;
}

function BoxIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="4" y="11" width="24" height="17" rx="2" stroke="#D4D2CB" strokeWidth="1.5"/>
      <path d="M4 15H28" stroke="#D4D2CB" strokeWidth="1.5"/>
      <path d="M13 4H19L21 11H11L13 4Z" stroke="#D4D2CB" strokeWidth="1.5" strokeLinejoin="round"/>
      <path d="M13 15V20H19V15" stroke="#D4D2CB" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M7 1V13M1 7H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );
}

export default function PackagesSection({
  packages,
  onAdd,
  onRemove,
  onUpdate,
}: PackagesSectionProps) {
  return (
    <SectionCard
      eyebrow="04 — Packages"
      title="Package information"
      subtitle="Add one or more packages. Each is editable independently."
    >
      <div className={styles.packageList}>
        {packages.length === 0 ? (
          <div className={styles.emptyState} aria-live="polite">
            <span className={styles.emptyIcon}>
              <BoxIcon />
            </span>
            <span className={styles.emptyText}>No packages added yet</span>
          </div>
        ) : (
          packages.map((pkg, index) => (
            <div key={pkg.id} className={styles.packageCard}>
              <div className={styles.accentBar} aria-hidden="true" />
              <div className={styles.packageInner}>
                {/* Card header */}
                <div className={styles.packageHeader}>
                  <span className={styles.packageLabel}>
                    Package {String(index + 1).padStart(2, '0')}
                  </span>
                  {/* Remove button: only rendered when there are multiple packages */}
                  {packages.length > 1 && (
                    <Button
                      variant="iconGhost"
                      onClick={() => onRemove(pkg.id)}
                      ariaLabel={`Remove package ${index + 1}`}
                    >
                      <CloseIcon />
                    </Button>
                  )}
                </div>

                {/* Label field — full width */}
                <TextField
                  label="Label"
                  value={pkg.label}
                  onChange={(v) => onUpdate(pkg.id, 'label', v)}
                  placeholder="e.g. Carton — books"
                />

                {/* Dimensions grid */}
                <div className={styles.dimsGrid}>
                  <NumberField
                    label="Weight"
                    value={pkg.weight}
                    onChange={(v) => onUpdate(pkg.id, 'weight', v)}
                    placeholder="0.00"
                    suffix="kg"
                    min={0}
                    step={0.01}
                  />
                  <NumberField
                    label="Length"
                    value={pkg.length}
                    onChange={(v) => onUpdate(pkg.id, 'length', v)}
                    placeholder="0"
                    suffix="cm"
                    min={0}
                  />
                  <NumberField
                    label="Width"
                    value={pkg.width}
                    onChange={(v) => onUpdate(pkg.id, 'width', v)}
                    placeholder="0"
                    suffix="cm"
                    min={0}
                  />
                  <NumberField
                    label="Height"
                    value={pkg.height}
                    onChange={(v) => onUpdate(pkg.id, 'height', v)}
                    placeholder="0"
                    suffix="cm"
                    min={0}
                  />
                </div>

                {/* Declared value */}
                <NumberField
                  label="Declared Value"
                  value={pkg.declaredValue}
                  onChange={(v) => onUpdate(pkg.id, 'declaredValue', v)}
                  placeholder="0"
                  prefix="₹"
                  min={0}
                />
              </div>
            </div>
          ))
        )}

        {/* Add package button */}
        <div className={styles.addRow}>
          <Button variant="ghostDashed" onClick={onAdd} ariaLabel="Add another package">
            <PlusIcon />
            Add {packages.length === 0 ? 'a package' : 'another package'}
          </Button>
        </div>
      </div>
    </SectionCard>
  );
}
