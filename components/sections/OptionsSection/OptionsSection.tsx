import SectionCard from '@/components/ui/SectionCard/SectionCard';
import Checkbox from '@/components/ui/Checkbox/Checkbox';
import styles from './OptionsSection.module.css';

interface OptionsSectionProps {
  fragile: boolean;
  insured: boolean;
  onFragileChange: (v: boolean) => void;
  onInsuredChange: (v: boolean) => void;
}

export default function OptionsSection({
  fragile,
  insured,
  onFragileChange,
  onInsuredChange,
}: OptionsSectionProps) {
  return (
    <SectionCard eyebrow="05 — Options" title="Shipment options">
      <div className={styles.checkboxRow}>
        <Checkbox
          label="Fragile"
          sublabel="Handle with care"
          checked={fragile}
          onChange={onFragileChange}
        />
        <Checkbox
          label="Insurance required"
          sublabel="Coverage at declared value"
          checked={insured}
          onChange={onInsuredChange}
        />
      </div>
    </SectionCard>
  );
}
