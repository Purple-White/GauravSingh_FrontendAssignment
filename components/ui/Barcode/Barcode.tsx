import styles from './Barcode.module.css';

interface BarcodeProps {
  value: string;
}

export default function Barcode({ value }: BarcodeProps) {
  const widths: number[] = [];
  for (let i = 0; i < value.length; i++) {
    const digit = value.charCodeAt(i) % 10;
    const barWidth = digit < 4 ? 1 : digit < 7 ? 2 : 3;
    widths.push(barWidth);
    widths.push(1);
  }

  const total = widths.reduce((s, w) => s + w, 0);
  const scale = total > 0 ? 240 / total : 1;

  const rects: { x: number; width: number }[] = [];
  let x = 0;
  for (let i = 0; i < widths.length; i++) {
    const w = widths[i] * scale;
    if (i % 2 === 0) {
      rects.push({ x, width: w });
    }
    x += w;
  }

  return (
    <svg width="240" height="40" viewBox="0 0 240 40" aria-hidden="true">
      <g className={styles.barcodeGroup}>
        {rects.map((r, i) => (
          <rect key={i} x={r.x} y="0" width={r.width} height="40" />
        ))}
      </g>
    </svg>
  );
}
